import {
  BaseToken,
  isPhraseToken,
  isWordToken,
  Token,
  WordToken,
} from '@analyzer/lang/analyzer';
import * as wanakana from 'wanakana';
import { printEntry } from './printEntry';

interface Frame {
  name: string;
  startTokenId: number;
  endTokenId: number;
}

interface Arrow {
  fromTokenId: number;
  toTokenId: number;

  startTokenId: number;
  endTokenId: number;

  startTokenPos: number;
  endTokenPos: number;

  orientation: 'left' | 'right';
}

export class Visualization {
  private words: (BaseToken | WordToken)[];
  private wordsDict: Record<number, BaseToken | WordToken>;
  private frames: Frame[];
  private arrows: Arrow[];

  private idsMapping: Record<number, number>;
  private wordBoundaries: Record<number, { start: number; end: number }>;
  private arrowStarts: Record<number, number>;
  private arrowEnds: Record<number, number>;
  private tokenOrd: Record<number, number>;

  private readonly textFontSize = 20;
  private readonly wordSpacing = this.textFontSize * 1.5;
  private readonly readingFontSize = 10;
  private readonly circleFontSize = 10;
  private readonly frameNameFontSize = 10;
  private readonly textSpacing = 5;
  private readonly spacing = 8;
  private readonly arrowSpacing = 5;

  constructor(private tokens: Token[]) {
    // Extract words
    this.words = tokens.reduce((acc, token) => {
      if (isPhraseToken(token)) {
        acc.push(...token.tokens);
      } else acc.push(token);
      return acc;
    }, [] as (BaseToken | WordToken)[]);
    this.wordsDict = Object.fromEntries(
      this.words.map((item) => [item.i, item])
    );

    // Generate id mapping
    this.idsMapping = {};
    for (const word of this.words) {
      if (isWordToken(word)) {
        for (const token of word.tokens) {
          this.idsMapping[token.i] = word.i;
        }
        for (const token of word.conjugationTokens) {
          this.idsMapping[token.i] = word.i;
        }
      } else {
        this.idsMapping[word.i] = word.i;
      }
    }

    // Generate tokenOrd
    this.tokenOrd = Object.fromEntries(
      this.words
        .filter((word) => word.pos !== 'PUNCT')
        .map((word, i) => [word.i, i + 1])
    );

    // Extract frames
    this.frames = tokens.reduce((acc, item) => {
      if ('name' in item) {
        acc.push({
          name: item.name,
          startTokenId: this.getTokenId(item.tokens[0]),
          endTokenId: this.getTokenId(item.tokens[item.tokens.length - 1]),
        });
      }
      return acc;
    }, [] as Frame[]);

    // Generate word boundaries
    this.wordBoundaries = {};
    let start = 0;
    for (const word of this.words) {
      const w = word.surface.length * this.textFontSize;
      this.wordBoundaries[this.getTokenId(word)] = {
        start: start,
        end: start + w,
      };
      start += w + this.wordSpacing;
    }

    this.arrowStarts = {};
    this.arrowEnds = {};

    // Generate arrows
    this.arrows = this.words
      .filter(
        (item) =>
          this.resolveId(item.i) !== this.resolveId(item.head) &&
          this.resolveToken(item.i).pos !== 'PUNCT' &&
          this.resolveToken(item.head).pos !== 'PUNCT'
      )
      .map((item) => {
        const fromTokenId = this.resolveId(item.i);
        const toTokenId = this.resolveId(item.head);
        const [startTokenId, endTokenId] = [fromTokenId, toTokenId].sort(
          (a, b) => a - b
        );

        this.arrowStarts[fromTokenId] ??= 0;
        this.arrowStarts[toTokenId] ??= 0;
        this.arrowEnds[fromTokenId] ??= 0;
        this.arrowEnds[toTokenId] ??= 0;

        return {
          startTokenId,
          endTokenId,
          fromTokenId,
          toTokenId,
          orientation:
            startTokenId === fromTokenId
              ? ('right' as const)
              : ('left' as const),
        };
      })
      .sort(
        (a, b) => a.startTokenId - b.startTokenId || b.endTokenId - a.endTokenId
      )
      .map((item) => {
        return {
          ...item,
          startTokenPos: this.arrowStarts[item.startTokenId]++,
          endTokenPos: this.arrowEnds[item.endTokenId]++,
        };
      })
      .map((item) => ({
        ...item,
        endTokenPos: this.arrowEnds[item.startTokenId] + item.startTokenPos,
        startTokenPos: this.arrowEnds[item.endTokenId] - item.endTokenPos - 1,
      }));
  }

  private resolveId(id: number) {
    return this.idsMapping[id];
  }

  private resolveToken(id: number) {
    return this.wordsDict[this.resolveId(id)];
  }

  private getTokenId(token: WordToken | BaseToken) {
    return this.resolveId(token.i);
  }

  private getTokenOrd(token: BaseToken | BaseToken) {
    return this.tokenOrd[this.getTokenId(token)];
  }

  private getWordStart(id: number) {
    return this.wordBoundaries[id].start;
  }

  private getWordEnd(id: number) {
    return this.wordBoundaries[id].end;
  }

  private getWordMiddle(id: number) {
    const dist = this.getWordStart(id);
    return (
      dist + (this.resolveToken(id).surface.length / 2) * this.textFontSize
    );
  }

  private drawArrowHead(x: number, y: number) {
    const w = 4;
    const h = 4;
    return `<path d='M${x - w / 2},${y} L${x},${y + h} L${x + w / 2},${y} L${
      x - w / 2
    },${y}' fill='black'/>`;
  }

  private getArrowPointsCount(id: number) {
    return this.arrowStarts[id] + this.arrowEnds[id];
  }

  private applySpacingToArrowPoint(
    basePosition: number,
    ord: number,
    total: number
  ) {
    return (
      basePosition -
      ((total - 1) * this.arrowSpacing) / 2 +
      ord * this.arrowSpacing
    );
  }

  private getArrowParams(arrow: Arrow) {
    const [start, end] = [
      this.applySpacingToArrowPoint(
        this.getWordMiddle(arrow.startTokenId),
        arrow.endTokenPos,
        this.getArrowPointsCount(arrow.startTokenId)
      ),
      this.applySpacingToArrowPoint(
        this.getWordMiddle(arrow.endTokenId),
        arrow.startTokenPos,
        this.getArrowPointsCount(arrow.endTokenId)
      ),
    ];
    const r = (end - start) / 2;
    return { r, start, end };
  }

  private getArrowYRadius(r: number) {
    return (r / 3) * 2;
  }

  private drawArrow(arrow: Arrow, offsetX: number, offsetY: number) {
    const { r, start, end } = this.getArrowParams(arrow);
    return `
<path d='M${offsetX + start},${offsetY} A ${r} ${this.getArrowYRadius(
      r
    )} 0 0 1 ${
      offsetX + end
    } ${offsetY}' stroke='black' stroke-width='1' fill-opacity='0'/>
${this.drawArrowHead(
  offsetX + (arrow.orientation === 'left' ? start : end),
  offsetY
)}
`;
  }

  private drawText(offsetX: number, offsetY: number) {
    let out = '';
    let end = 0;
    for (const word of this.words) {
      const ord = this.getTokenOrd(word);

      const x = this.getWordStart(this.getTokenId(word));
      end = this.getWordEnd(this.getTokenId(word));
      out += `<text x='${offsetX + x}' y='${
        offsetY + this.textFontSize
      }' class='text'>${word.surface}</text>`;
      out += `<text x='${offsetX + x}' y='${
        offsetY +
        this.textFontSize +
        this.textSpacing * 2 +
        this.readingFontSize
      }' class='reading'>${
        (ord === undefined ? '' : `(${ord}) `) +
        wanakana.toRomaji(word.reading ?? '')
      }</text>\n`;
    }
    return {
      svg: out,
      w: end,
      h: this.textFontSize + this.textSpacing * 2 + this.readingFontSize,
    };
  }

  private drawFrames(offsetX: number, offsetY: number) {
    let out = '';
    for (const frame of this.frames) {
      const x = this.getWordStart(frame.startTokenId);
      const end = this.getWordEnd(frame.endTokenId);
      const w = end - x;
      out += `<text x='${offsetX + x + this.textSpacing}' y='${
        offsetY - this.textSpacing / 2
      }' class='frame-name'>${frame.name}</text>`;
      out += `<rect x='${offsetX + x}' y='${offsetY}' width='${w}' height='${
        this.textFontSize + this.textSpacing
      }' rx='3' stroke='#000' fill-opacity='0'/>`;
    }
    return out;
  }

  draw() {
    const maxArrowHeight = Math.max(
      ...this.arrows.map((arrow) =>
        this.getArrowYRadius(this.getArrowParams(arrow).r)
      )
    );

    let svg = '';

    // Draw arrows
    for (const arrow of this.arrows) {
      svg +=
        this.drawArrow(arrow, this.spacing, maxArrowHeight + this.spacing) +
        '\n';
    }

    // Draw text
    const textOffsetY = this.spacing + maxArrowHeight + this.textSpacing * 3;
    const text = this.drawText(this.spacing, textOffsetY);
    svg += text.svg;

    // Draw frames
    svg += this.drawFrames(this.spacing, textOffsetY);
    const w = text.w + 2 * this.spacing;
    const h = textOffsetY + text.h + this.spacing;

    return `
<svg viewBox='0 0 ${w} ${h}' width='${w}' height='${h}' xmlns='http://www.w3.org/2000/svg'>
<style>
  .text {font-size: ${this.textFontSize}px;}
  .reading {font-size: ${this.readingFontSize}px;}
  .circle {font-size: ${this.circleFontSize}px;}
  .frame-name {font-size: ${this.frameNameFontSize}px;}
</style>
<rect width='100%' height='100%' fill='white' />
${svg}
</svg>
`;
  }

  private printWord(word: BaseToken | WordToken, latex = false) {
    const ord = this.getTokenOrd(word);
    const hiragana = wanakana.toHiragana(word.reading ?? '');
    const romaji = wanakana.toRomaji(word.reading ?? '');
    if (latex) {
      let out = `(${ord}) \\jp{${word.surface}【${hiragana},${romaji}】\\rightarrow ${word.dict}}\\medskip\\\\\n`;
      if (isWordToken(word) && word.entryIds.length > 0) {
        out += '\\textbf{Entries}\n\\begin{itemize}\n';
        for (const entryId of word.entryIds) {
          out += `    \\item ${printEntry(entryId, latex)}\n`;
        }
        out += `\\end{itemize}\n`;
      }
      if (isWordToken(word) && word.deconjugation) {
        out += '\\textbf{Conjugation}\n\\begin{itemize}\n';
        for (const item of word.deconjugation) {
          out += `    \\item \\jp{${item.dict}}; ${
            item.type
          }; ${item.conjugation.join(' \\rightarrow ')}\n`;
        }
        out += `\\end{itemize}\n`;
      }

      return out;
    } else {
      const entries =
        isWordToken(word) && word.entryIds.length > 0
          ? '\nentries:\n- ' +
            word.entryIds
              .map((entryId) => printEntry(entryId, latex))
              .join('\n- ')
          : '';
      const conjugation =
        isWordToken(word) && word.deconjugation
          ? '\nconjugation:\n- ' +
            word.deconjugation
              .map(
                (item) =>
                  `${item.dict}; ${item.type}; ${item.conjugation.join(' → ')}`
              )
              .join('\n- ')
          : '';

      return `(${ord}) ${word.surface}
dict: ${word.dict}
reading: ${hiragana}
romaji: ${romaji}${entries}${conjugation}`;
    }
  }

  print() {
    let out = '';
    for (const word of this.words) {
      if (word.pos === 'PUNCT') continue;
      out += this.printWord(word) + '\n-----\n';
    }
    return out;
  }

  printLatex(title: string, label: string, imagePath: string) {
    let content = `\\jp{\\includesvg[width=\\columnwidth,inkscapelatex=false]{${imagePath}}}\n\\tcbline\n\n`;
    content += this.words
      .filter((word) => word.pos !== 'PUNCT')
      .map((word) => {
        return this.printWord(word, true);
      })
      .join('\\tcbline\n\n');

    content = '    ' + content.replace(/(\n(?!$))/g, '\n    ');
    return `\\begin{demo}[label=${label}]{${title}}\n${content}\\end{demo}\n`;
  }
}
