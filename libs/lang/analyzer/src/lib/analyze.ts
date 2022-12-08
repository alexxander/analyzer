import { segment } from './segment/segment';
import { mergeWords } from './mergeWords/mergeWords';
import { matchPhrases } from './matchPhrases/matchPhrases';
import { Token } from './utils/tokens';

export async function analyze(text: string): Promise<Token[]> {
  return matchPhrases(mergeWords(await segment(text)));
}
