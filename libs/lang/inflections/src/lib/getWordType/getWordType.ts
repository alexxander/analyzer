import { dictionary } from '@analyzer/lang/dictionary';
import { WordType } from '../wordType';
import { templatesDict } from '../templates';
import { guessWordType } from './guessWordType';

const directMapping: Record<string, WordType> = {
  くれる: WordType.v1_s,
  呉れる: WordType.v1_s,

  いく: WordType.v5k_s,
  行く: WordType.v5k_s,

  とう: WordType.v5u_s,
  問う: WordType.v5u_s,

  こう: WordType.v5u_s,
  乞う: WordType.v5u_s,
  請う: WordType.v5u_s,

  ある: WordType.v5r_i,
  有る: WordType.v5r_i,
  在る: WordType.v5r_i,

  する: WordType.vs_i,
  為る: WordType.vs_i,

  くる: WordType.vk,
  来る: WordType.vk,

  いい: WordType.adj_ix,
  良い: WordType.adj_ix,
};

export function getWordType(word: string): WordType {
  if (directMapping[word]) return directMapping[word];

  const dictPos = Array.from(dictionary.getJmdictPos(word)).find(
    (pos) => pos in templatesDict
  ) as any;
  if (dictPos) return dictPos as WordType;

  return guessWordType(word);
}
