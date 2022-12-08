import fs from 'fs';
import { Visualization } from './app/Visualization';
import { dictionaryLoadWordsFromFile } from '@analyzer/lang/dictionary';
import { analyze, stopSegmentProcess } from '@analyzer/lang/analyzer';

const texts = {
  simple: ['日本語は美しい。', '新しいパソコンが欲しい。'],
  wordBoundaries: ['ショックから元気を取り戻した。'],

  'grammar.conjugation': ['食べさせられたくなかった。'],
  'grammar.conjugation.conditional': ['忙しくなければ、手伝ってください。'],
  'grammar.conjugation.passiveCausative': [
    '忙しい時に待たせられることが好きではありません。',
  ],
  'grammar.polite.honorific': ['先生はお教えになります。'],
  'grammar.polite.humble': ['先生にお聞きします。'],
  'grammar.obligation': ['行かなくてはいけない。'],
  'grammar.prohibition': ['行ってはいけない。'],
  'grammar.permission': ['行ってもいい。'],
  'grammar.advice': ['行って方がいい。', '行って方がよかった。'],
  'grammar.suffixes': [
    'ハンバーガーを食べ過ぎないでください。',
    '日本語は読みにくいです。',
  ],

  'numbers.price': ['この家は八億九千五百四十三万二千百五十六円です。'],
  'numbers.people': ['5人がテーブルに座っています。'],
  'numbers.animals': ['猫を3匹と犬を2匹飼っています。'],
  'numbers.datetime': [
    '今は令和4年11月27日12時7分25秒です。',
    '午前九時半に会いましょう。',
  ],
};

(async () => {
  try {
    await dictionaryLoadWordsFromFile();
    let ord = 1;
    fs.mkdirSync('dist/preview/diagram', { recursive: true });
    fs.mkdirSync('dist/preview/plain', { recursive: true });
    fs.mkdirSync('dist/preview/tex', { recursive: true });

    let latexDocumentContent = '';
    for (const [name, items] of Object.entries(texts)) {
      for (let i = 0; i < items.length; i++) {
        const text = items[i];
        const tokens = await analyze(text);

        const visualization = new Visualization(tokens);
        fs.writeFileSync(
          `dist/preview/diagram/${ord}.svg`,
          visualization.draw()
        );

        fs.writeFileSync(
          `dist/preview/plain/${ord}.txt`,
          visualization.print()
        );

        fs.writeFileSync(
          `dist/preview/tex/${ord}.tex`,
          visualization.printLatex(
            `${name
              .split('.')
              .map((item) => capitalize(item))
              .join(' -- ')}${items.length > 1 ? ` ${i + 1}` : ''}`,
            `demo:${name}${items.length > 1 ? `${i + 1}` : ''}`,
            `diagram/${ord}.svg`
          )
        );
        latexDocumentContent += `\\input{tex/${ord}.tex}\n`;

        ord++;
      }
    }
    fs.writeFileSync(
      `dist/preview/preview.tex`,
      createLatexDocument(latexDocumentContent)
    );
    console.log('Done.');
  } catch (e) {
    console.error(e);
  } finally {
    stopSegmentProcess();
  }
})();

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function createLatexDocument(content: string) {
  return `\\documentclass{article}

\\usepackage{polyglossia}
\\setmainlanguage{english}
\\setotherlanguages{japanese}
\\newfontfamily\\japanesefont[Script=CJK,Ligatures=Common]{Noto Serif CJK JP}
\\newcommand{\\jp}[1]{\\foreignlanguage{japanese}{#1}}

\\usepackage[most]{tcolorbox}
\\newtcolorbox[auto counter]{demo}[2][]{sharp corners, breakable, colframe=gray,
    title=Demo \\thetcbcounter: #2, #1}
\\makeatletter\\newcommand\\tcb@cnt@demoautorefname{Demo}\\makeatother

\\usepackage{svg}

\\begin{document}

${content}

\\end{document}
`;
}
