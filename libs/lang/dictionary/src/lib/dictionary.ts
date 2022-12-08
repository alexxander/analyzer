import * as fs from 'fs';
import { Jmdict } from '@analyzer/utils/jmdict';
import { jmdictToUnidic } from './jmdictToUnidic';

interface WordIndex {
  [word: string]: Set<string>;
}

interface WordPosIndex {
  [word: string]: { [pos: string]: Set<string> };
}

interface WordToPos {
  [word: string]: Set<string>;
}

class Dictionary {
  private wordIndex: WordIndex = {};
  private wordPosIndex: WordPosIndex = {};
  private wordToPos: WordToPos = {};
  private maxWordLength = 0;

  private entries: Record<string, Jmdict.WordEntry> = {};

  get(word: string, pos?: string): Set<string> {
    if (pos === undefined) return this.wordIndex[word] ?? new Set();
    return this.wordPosIndex[word]?.[pos] ?? new Set();
  }

  getEntry(id: string): Jmdict.WordEntry | null {
    return this.entries?.[id] ?? null;
  }

  getJmdictPos(word: string): Set<string> {
    return this.wordToPos[word] ?? new Set();
  }

  getMaxWordLength() {
    return this.maxWordLength;
  }

  async loadWordsFromFile(path: string) {
    this.indexData(JSON.parse(fs.readFileSync(path).toString()));
  }

  reset() {
    this.entries = {};
    this.wordIndex = {};
    this.wordPosIndex = {};
    this.wordToPos = {};
    this.maxWordLength = 0;
  }

  indexData(entries: Jmdict.WordEntry[]): void {
    for (const entry of entries) {
      this.entries[entry.id] = entry;

      const elements = [
        ...entry.readingElements.filter(
          (item) => item.info.every((info) => info.code !== 'sk') // Filter out search-only items
        ),
        ...(entry.kanjiElements ?? []).filter(
          (item) => item.info.every((info) => info.code !== 'sK') // Filter out search-only items
        ),
      ];
      for (const { value } of elements) {
        // Update the max word length
        this.maxWordLength = Math.max(this.maxWordLength, value.length);

        // Add to wordIndex
        this.wordIndex[value] ??= new Set<string>([]);
        this.wordIndex[value].add(String(entry.id));

        // Add to wordPosIndex and wordToPos
        this.wordToPos[value] ??= new Set();
        this.wordPosIndex[value] ??= {};
        for (const sense of entry.senses) {
          const jmdictPos = sense.pos.map((item) => item.code);
          const unidicPos = jmdictPos
            .map((item) => jmdictToUnidic[item as keyof typeof jmdictToUnidic])
            .filter((item) => item)
            .flat();
          const partsOfSpeech = [...jmdictPos, ...unidicPos];

          for (const pos of partsOfSpeech) {
            if (this.wordPosIndex[value][pos] === undefined) {
              this.wordPosIndex[value][pos] = new Set<string>();
            }
            this.wordPosIndex[value][pos].add(String(entry.id));
          }
          for (const pos of jmdictPos) {
            this.wordToPos[value].add(pos);
          }
        }
      }
    }
  }
}

export const dictionary = new Dictionary();
