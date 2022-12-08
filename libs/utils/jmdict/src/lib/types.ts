export namespace Jmdict {
  interface Entity {
    code: string;
    value: string;
  }

  export interface KanjiElement {
    value: string;
    info: Entity[];
    priority: string[];
  }

  export interface ReadingElement {
    value: string;
    noKanji: boolean;
    /** Restriction to particular kanji values */
    restrictions: string[];
    info: Entity[];
    priority: string[];
  }

  interface Reference {
    kanjiElement?: string;
    readingElement?: string;
    sense?: number;
    id?: number;
  }

  export interface Sense {
    kanjiRestrictions: string[];
    readingRestrictions: string[];
    references: Reference[];
    antonyms: Reference[];
    pos: Entity[];
    fields: Entity[];
    misc: Entity[];
    info: string[];
    languageSources: {
      lang: string;
      value?: string;
      part?: boolean;
      wasei?: boolean;
    }[];
    dialects: Entity[];
    glosses: Gloss[];
    examples: Example[];
  }

  export interface Example {
    source: { type: string; value: string };
    text: string;
    sentences: {
      lang: string;
      value: string;
    }[];
  }

  export interface Gloss {
    value: string;
    lang: string;
    type?: string;
  }

  export interface WordEntry {
    id: number;
    kanjiElements?: KanjiElement[];
    readingElements: ReadingElement[];
    senses: Sense[];
  }
}
