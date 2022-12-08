import { isKanji } from 'wanakana';
import { dictionary } from '@analyzer/lang/dictionary';
import { suffixIndex } from './suffixIndex';
import { WordType } from './wordType';
import { templatesDict } from './templates';
import { FormName } from './templateTypes';

export interface DeconjugationItem {
  root: string;
  suffix: string;
  dict: string;
  type: WordType;
  conjugation: FormName[];
}

export function deconjugate(
  word: string,
  wordDict?: string
): DeconjugationItem[] {
  const out: DeconjugationItem[] = [];
  let minBaseRootLength = 0;
  let maxBaseRootLength = word.length;

  // Determine the base root (i.e. root without the irregular part) length based on the given dictionary form of the word
  if (wordDict) {
    const templateNames: WordType[] = (
      Array.from(dictionary.getJmdictPos(wordDict)) as WordType[]
    ).filter((name) => name in templatesDict);
    const baseRootLengths = templateNames.map(
      (name) =>
        wordDict.length -
        (templatesDict[name]!.nonPast ?? '').replace('・', '').length
    );
    minBaseRootLength = Math.min(...baseRootLengths);
    maxBaseRootLength = Math.max(...baseRootLengths);
  }

  for (let i = minBaseRootLength; i <= maxBaseRootLength; i++) {
    const baseRoot = word.slice(0, i);
    const baseSuffix = word.slice(i, word.length);

    for (const value of suffixIndex[baseSuffix] ?? []) {
      const [rootExtension, suffix] = value.suffix.includes('・')
        ? value.suffix.split('・')
        : ['', value.suffix];
      const rootExtensionHasKanji = !!Array.from(rootExtension).find(isKanji);
      const root = baseRoot + rootExtension;
      const nonPastForm = templatesDict[value.type]?.nonPast ?? '';
      const nonPastFormSuffix = nonPastForm.includes('・')
        ? nonPastForm.split('・')[1]
        : nonPastForm;
      const dict =
        baseRoot +
        (rootExtensionHasKanji
          ? rootExtension + nonPastFormSuffix
          : nonPastForm.replace('・', ''));

      // if (wordDict !== undefined && dict !== wordDict)
      //   throw new Error(
      //     'The generated deconjugated form does not match the user-provided dictionary form'
      //   );

      if (dictionary.get(dict, value.type).size > 0) {
        out.push({
          ...value,
          root,
          suffix,
          dict,
        });
      }
    }
  }

  return out;
}
