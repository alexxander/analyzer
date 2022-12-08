import { isKanji } from 'wanakana';
import { assertDefined } from '@analyzer/utils/assert';
import { getAttribute, getContent } from './xmlUtils';
import { DictParser } from './DictParser';
import { Jmdict } from '../types';

interface Identifier {
  id: number;
  keb: string[];
  reb: string[];
}

type Conflict =
  | {
      type: 'xref';
      raw: string;
      parsed: { kanjiElement: string; readingElement: string; sense: number };
      ids: number[];
    }
  | {
      type: 'ant';
      raw: string;
      parsed: { kanjiElement: string; readingElement: string };
      ids: number[];
    };

export class JmdictParser extends DictParser<Jmdict.WordEntry> {
  private idMap: Record<string, number[]> = {};
  private conflicts: Conflict[] = [];

  constructor() {
    super(
      assertDefined(process.env.JMDICT_PATH, 'JMDICT_PATH is undefined'),
      '/JMDICT/ENTRY'
    );
  }

  async initialize() {
    await this.generateIdMap();
  }

  protected parseEntry(item: any): Jmdict.WordEntry {
    const entry: any = item.ENTRY;
    const id = entry.ENT_SEQ[0];
    const out: Jmdict.WordEntry = {
      id: Number(id),
      kanjiElements: entry.K_ELE?.map((item: any) =>
        this.parseKanjiElement(item)
      ),
      readingElements: entry.R_ELE?.map((item: any) =>
        this.parseReadingElement(item)
      ),
      senses: (entry.SENSE as any[])
        .map((item: any) => this.parseSense(item))
        .filter((sense) => sense.glosses.some((gloss) => gloss.lang === 'eng')),
    };
    return out;
  }

  private parseKanjiElement(item: any): Jmdict.KanjiElement {
    return {
      value: item.KEB[0],
      info: this.parseEntities(item.KE_INF),
      priority: item.KE_PRI ?? [],
    };
  }

  private parseReadingElement(item: any): Jmdict.ReadingElement {
    return {
      value: item.REB[0],
      noKanji: !!item.NO_KANJI,
      restrictions: item.RE_RESTR ?? [],
      info: this.parseEntities(item.RE_INF),
      priority: item.RE_PRI ?? [],
    };
  }

  private parseSense(item: any): Jmdict.Sense {
    return {
      kanjiRestrictions: item.STAGK ?? [],
      readingRestrictions: item.STAGR ?? [],
      references:
        item.XREF?.map((xref: string) => {
          return this.parseReference('ant', xref);
        }) ?? [],
      antonyms:
        item.ANT?.map((ant: any) => {
          return this.parseReference('ant', ant);
        }) ?? [],
      pos: this.parseEntities(item.POS),
      fields: this.parseEntities(item.FIELD),
      misc: this.parseEntities(item.MISC),
      info: item.S_INF ?? [],
      languageSources:
        item.LSOURCE?.map((source: any) => ({
          lang: getAttribute(source, 'XML:LANG') ?? 'eng',
          value: getContent(source),
          part: getAttribute(source, 'LS_TYPE') === 'part',
          wasei: !!getAttribute(source, 'LS_WASEI'),
        })) ?? [],
      dialects: this.parseEntities(item.DIAL),
      glosses:
        item.GLOSS?.map(
          (gloss: any): Jmdict.Gloss => ({
            value: getContent(gloss) ?? '',
            lang: getAttribute(gloss, 'XML:LANG') ?? 'eng',
            type: getAttribute(gloss, 'G_TYPE'),
          })
        ).filter((gloss: Jmdict.Gloss) => gloss.lang === 'eng') ?? [],
      examples:
        item.EXAMPLE?.map(
          (example: any): Jmdict.Example => ({
            source: example.EX_SRCE[0],
            text: example.EX_TEXT[0],
            sentences: example.EX_SENT,
          })
        ) ?? [],
    };
  }

  private parseReference(type: Conflict['type'], ref: string) {
    const parts = ref.split('・');
    let sense;
    if (!Number.isNaN(Number(parts[parts.length - 1]))) {
      sense = Number(parts.pop());
    }
    let parsed;
    if (parts.length === 2) {
      parsed = {
        kanjiElement: parts[0],
        readingElement: parts[1],
        sense,
      };
    } else if (Array.from(parts[0]).some(isKanji)) {
      parsed = {
        kanjiElement: parts[0],
        sense,
      };
    } else {
      parsed = { readingElement: parts[0], sense };
    }
    const ids =
      this.idMap[`${parsed.kanjiElement}|${parsed.readingElement}`] ??
      this.idMap[parsed.kanjiElement ?? parsed.readingElement ?? ''];

    if (!ids || ids.length > 1) {
      this.conflicts.push({ type, raw: ref, parsed, ids } as any);
      return parsed;
    }
    return {
      id: ids[0],
      ...parsed,
    };
  }

  private async generateIdMap() {
    await this.parseFile(async (entryWrapper, error) => {
      if (error || !entryWrapper) return;
      try {
        const entry: any = entryWrapper.ENTRY;
        const addItem = (key: string, value: number) => {
          if (!this.idMap[key]) {
            this.idMap[key] = [];
          }
          this.idMap[key].push(value);
        };

        const identifier: Identifier = {
          id: Number(entry.ENT_SEQ[0]),
          keb: entry.K_ELE?.map((item: any): string => item.KEB[0]) ?? [],
          reb: entry.R_ELE?.map((item: any): string => item.REB[0]) ?? [],
        };

        identifier.keb.forEach((keb) =>
          identifier.reb.forEach((reb) => {
            addItem(`${keb}|${reb}`, identifier.id);
          })
        );
        identifier.keb.forEach((keb) => {
          addItem(`${keb}`, identifier.id);
        });
        identifier.reb.forEach((reb) => {
          addItem(`${reb}`, identifier.id);
        });
      } catch (e) {
        console.error(e);
      }
    });
  }
}
