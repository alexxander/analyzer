import { generateCombinations } from '@analyzer/utils/combinations';

export function generateObligationSentences() {
  return Array.from(
    generateCombinations([
      ['行か'],
      ['なければ', 'なくては'],
      [
        'なりません',
        'ならない',
        'いけません',
        'いけない',
        'だめです',
        'だめだ',
      ],
      ['。'],
    ])
  )
    .concat(
      Array.from(
        generateCombinations([
          ['行か'],
          ['なきゃ', 'なくちゃ', 'ないと'],
          ['いけません', 'いけない', 'だめです', 'だめだ', ''],
          ['。'],
        ])
      )
    )
    .map((item) => item.join(''));
}
