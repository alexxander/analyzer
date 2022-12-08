import { NaiForm, VerbForm, WordType } from '@analyzer/lang/inflections';
import { eras } from '@analyzer/lang/eras';
import { Pattern, SimplePOS } from './patternTypes';
import { WordTokenType } from '../utils/tokens';

export const patterns: Pattern[] = [
  {
    name: 'honorific',
    value: [
      'お',
      {
        pos: SimplePOS.v,
        conjugation: { endsWith: [VerbForm.masuStem] },
      },
      'に',
      {
        dict: 'なる',
        pos: WordType.v5r,
        conjugation: { contains: [VerbForm.formal] },
      },
    ],
  },
  {
    name: 'humble',
    value: [
      'お',
      {
        pos: SimplePOS.v,
        conjugation: { endsWith: [VerbForm.masuStem] },
      },
      { or: [[{ dict: 'する' }], [{ dict: 'いたす' }]] },
    ],
  },
  {
    name: 'obligation',
    value: [
      {
        or: [
          [
            {
              or: [
                [
                  {
                    conjugation: {
                      endsWith: [VerbForm.negative, NaiForm.conditional],
                    },
                  },
                ],
                [
                  {
                    conjugation: { endsWith: [VerbForm.negative, NaiForm.te] },
                  },
                  'は',
                ],
                [
                  {
                    conjugation: {
                      endsWith: [VerbForm.negative, NaiForm.kya],
                    },
                  },
                ],
                [
                  {
                    conjugation: {
                      endsWith: [VerbForm.negative, NaiForm.cha],
                    },
                  },
                ],
                [
                  {
                    conjugation: {
                      endsWith: [VerbForm.negative],
                    },
                  },
                  'と',
                ],
              ],
            },
            {
              or: [
                ['なりません'],
                ['ならない'],
                ['いけません'],
                ['いけない'],
                ['だめ', 'です'],
                ['だめ', 'だ'],
              ],
            },
          ],
          [
            {
              or: [
                [
                  {
                    conjugation: {
                      endsWith: [VerbForm.negative, NaiForm.kya],
                    },
                  },
                ],
                [
                  {
                    conjugation: {
                      endsWith: [VerbForm.negative, NaiForm.cha],
                    },
                  },
                ],
                [
                  {
                    conjugation: {
                      endsWith: [VerbForm.negative],
                    },
                  },
                  'と',
                ],
              ],
            },
          ],
        ],
      },
    ],
  },
  {
    name: 'permission',
    value: [{ conjugation: { endsWith: [VerbForm.te] } }, 'も', 'いい'],
  },
  {
    name: 'prohibition',
    value: [
      {
        or: [
          [
            {
              or: [
                [{ conjugation: { endsWith: [NaiForm.te] } }, 'は'],
                [
                  {
                    conjugation: {
                      endsWith: [NaiForm.cha],
                    },
                  },
                ],
              ],
            },
            {
              or: [
                ['なりません'],
                ['ならない'],
                ['いけません'],
                ['いけない'],
                ['だめ', 'です'],
                ['だめ', 'だ'],
              ],
            },
          ],
          [
            {
              conjugation: {
                endsWith: [NaiForm.cha],
              },
            },
          ],
        ],
      },
    ],
  },
  {
    name: 'advice',
    value: [
      { conjugation: { endsWith: [VerbForm.te] } },
      { or: [['方'], ['ほう']] },
      'が',
      { or: [['いい'], ['よかった']] },
    ],
  },
  {
    name: 'date',
    value: [
      {
        or: [
          // {pattern: 'era'},
          // Year
          [{ type: WordTokenType.numeric, token: [[1, '年']] }],
          [],
        ],
      },
      { type: WordTokenType.numeric, token: [[1, '月']] },
      { type: WordTokenType.numeric, token: [[1, '日']] },
    ],
  },
  {
    name: 'time',
    value: [
      { or: [['午後'], ['午前'], []] },
      { type: WordTokenType.numeric, token: [[1, '時']] },
      {
        or: [
          [
            { type: WordTokenType.numeric, token: [[1, '分']] },
            { optional: [{ type: WordTokenType.numeric, token: [[1, '秒']] }] },
          ],
          ['半'],
          [],
        ],
      },
    ],
  },
  {
    name: 'era',
    value: [
      // Era name
      { or: Object.keys(eras).map((item) => [item]) },
      // Year
      { type: WordTokenType.numeric, token: [[1, '年']] },
    ],
  },
  {
    name: 'tai',
    value: [
      { conjugation: { endsWith: [VerbForm.masuStem] } },
      { dict: 'たい' },
    ],
  },
  {
    name: 'tagaru',
    value: [
      { conjugation: { endsWith: [VerbForm.masuStem] } },
      { dict: 'たがる' },
    ],
  },
  {
    name: 'sugiru',
    value: [
      { conjugation: { endsWith: [VerbForm.masuStem] } },
      { or: [[{ dict: 'すぎる' }], [{ dict: '過ぎる' }]] },
    ],
  },
  {
    name: 'nikui',
    value: [
      { conjugation: { endsWith: [VerbForm.masuStem] } },
      { dict: 'にくい' },
    ],
  },
  {
    name: 'yasui',
    value: [
      { conjugation: { endsWith: [VerbForm.masuStem] } },
      { dict: 'やすい' },
    ],
  },
  {
    name: 'gachi',
    value: [{ conjugation: { endsWith: [VerbForm.masuStem] } }, 'がち'],
  },
  {
    name: 'strong-negative-desire',
    value: [
      { conjugation: { endsWith: [VerbForm.masuStem] } },
      'は',
      { dict: 'する', conjugation: { startsWith: [VerbForm.negative] } },
    ],
  },
  {
    name: 'without',
    value: [{ conjugation: { endsWith: [VerbForm.negative] } }, 'で'],
  },
];
