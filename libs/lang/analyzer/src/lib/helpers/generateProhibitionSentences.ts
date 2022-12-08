import { generateCombinations } from '@analyzer/utils/combinations';

export function generateProhibitionSentences() {
  const endings = [
    'なりません',
    'ならない',
    'いけません',
    'いけない',
    'だめです',
    'だめだ',
  ];

  return Array.from(
    generateCombinations([['行っては', '泳いでは'], endings, ['。']])
  )
    .concat(
      Array.from(
        generateCombinations([
          ['行っちゃ', '泳いじゃ'],
          [...endings, ''],
          ['。'],
        ])
      )
    )
    .map((item) => item.join(''));
}
