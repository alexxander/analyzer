import { assertDefined } from '@analyzer/utils/assert';
import { dictionary } from './dictionary';

export async function dictionaryLoadWordsFromFile() {
  console.time('dictionary-load-words-from-file');
  const dictJsonPath = assertDefined(
    process.env.DICT_JSON_PATH,
    'DICT_JSON_PATH is undefined'
  );
  await dictionary.loadWordsFromFile(dictJsonPath);
  console.timeEnd('dictionary-load-words-from-file');
}
