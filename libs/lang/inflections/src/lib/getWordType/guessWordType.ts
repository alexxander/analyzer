import { WordType } from '../wordType';

const suffixMapping: Record<string, WordType> = {
  いる: WordType.v1,
  きる: WordType.v1,
  ぎる: WordType.v1,
  しる: WordType.v1,
  じる: WordType.v1,
  ちる: WordType.v1,
  ぢる: WordType.v1,
  にる: WordType.v1,
  ひる: WordType.v1,
  びる: WordType.v1,
  ぴる: WordType.v1,
  みる: WordType.v1,
  りる: WordType.v1,

  える: WordType.v1,
  ける: WordType.v1,
  げる: WordType.v1,
  せる: WordType.v1,
  ぜる: WordType.v1,
  てる: WordType.v1,
  でる: WordType.v1,
  ねる: WordType.v1,
  へる: WordType.v1,
  べる: WordType.v1,
  ぺる: WordType.v1,
  める: WordType.v1,
  れる: WordType.v1,

  う: WordType.v5u,
  く: WordType.v5k,
  ぐ: WordType.v5g,
  す: WordType.v5s,
  つ: WordType.v5t,
  ぬ: WordType.v5n,
  ぶ: WordType.v5b,
  む: WordType.v5m,
  る: WordType.v5r,

  い: WordType.adj_i,
  だ: WordType.cop,
};

export function guessWordType(word: string): WordType {
  const type =
    suffixMapping[getSuffix(word, 2)] ?? suffixMapping[getSuffix(word, 1)];
  if (type) return type;

  return WordType.n;
}

function getSuffix(word: string, length: number) {
  return word.slice(Math.max(word.length - length, 0));
}
