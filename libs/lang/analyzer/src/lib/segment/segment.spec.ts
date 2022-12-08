import { segment, stopSegmentProcess } from './segment';

describe('segment', () => {
  afterAll(stopSegmentProcess);
  it('先生は日本の大学で英語をお教えになります。', async () => {
    expect.assertions(1);
    expect(await segment('先生は日本の大学で英語をお教えになります。')).toEqual(
      [
        {
          dep: 'nsubj',
          dict: '先生',
          head: 11,
          i: 0,
          norm: '先生',
          pos: 'NOUN',
          reading: 'センセイ',
          surface: '先生',
          tag: '名詞-普通名詞-一般',
        },
        {
          dep: 'case',
          dict: 'は',
          head: 0,
          i: 1,
          norm: 'は',
          pos: 'ADP',
          reading: 'ハ',
          surface: 'は',
          tag: '助詞-係助詞',
        },
        {
          dep: 'nmod',
          dict: '日本',
          head: 4,
          i: 2,
          norm: '日本',
          pos: 'PROPN',
          reading: 'ニッポン',
          surface: '日本',
          tag: '名詞-固有名詞-地名-国',
        },
        {
          dep: 'case',
          dict: 'の',
          head: 2,
          i: 3,
          norm: 'の',
          pos: 'ADP',
          reading: 'ノ',
          surface: 'の',
          tag: '助詞-格助詞',
        },
        {
          dep: 'obl',
          dict: '大学',
          head: 11,
          i: 4,
          norm: '大学',
          pos: 'NOUN',
          reading: 'ダイガク',
          surface: '大学',
          tag: '名詞-普通名詞-一般',
        },
        {
          dep: 'case',
          dict: 'で',
          head: 4,
          i: 5,
          norm: 'で',
          pos: 'ADP',
          reading: 'デ',
          surface: 'で',
          tag: '助詞-格助詞',
        },
        {
          dep: 'obj',
          dict: '英語',
          head: 11,
          i: 6,
          norm: '英語',
          pos: 'NOUN',
          reading: 'エイゴ',
          surface: '英語',
          tag: '名詞-普通名詞-一般',
        },
        {
          dep: 'case',
          dict: 'を',
          head: 6,
          i: 7,
          norm: 'を',
          pos: 'ADP',
          reading: 'ヲ',
          surface: 'を',
          tag: '助詞-格助詞',
        },
        {
          dep: 'compound',
          dict: 'お',
          head: 9,
          i: 8,
          norm: '御',
          pos: 'NOUN',
          reading: 'オ',
          surface: 'お',
          tag: '接頭辞',
        },
        {
          dep: 'obl',
          dict: '教える',
          head: 11,
          i: 9,
          norm: '教える',
          pos: 'NOUN',
          reading: 'オシエ',
          surface: '教え',
          tag: '動詞-一般',
        },
        {
          dep: 'case',
          dict: 'に',
          head: 9,
          i: 10,
          norm: 'に',
          pos: 'ADP',
          reading: 'ニ',
          surface: 'に',
          tag: '助詞-格助詞',
        },
        {
          dep: 'ROOT',
          dict: 'なる',
          head: 11,
          i: 11,
          norm: '成る',
          pos: 'VERB',
          reading: 'ナリ',
          surface: 'なり',
          tag: '動詞-非自立可能',
        },
        {
          dep: 'aux',
          dict: 'ます',
          head: 11,
          i: 12,
          norm: 'ます',
          pos: 'AUX',
          reading: 'マス',
          surface: 'ます',
          tag: '助動詞',
        },
        {
          dep: 'punct',
          dict: '。',
          head: 11,
          i: 13,
          norm: '。',
          pos: 'PUNCT',
          reading: '。',
          surface: '。',
          tag: '補助記号-句点',
        },
      ]
    );
  });
  it('日本語は美しい。', async () => {
    expect.assertions(1);
    expect(await segment('日本語は美しい。')).toEqual([
      {
        dep: 'compound',
        dict: '日本',
        head: 1,
        i: 0,
        norm: '日本',
        pos: 'PROPN',
        reading: 'ニホン',
        surface: '日本',
        tag: '名詞-固有名詞-地名-国',
      },
      {
        dep: 'nsubj',
        dict: '語',
        head: 3,
        i: 1,
        norm: '語',
        pos: 'NOUN',
        reading: 'ゴ',
        surface: '語',
        tag: '名詞-普通名詞-一般',
      },
      {
        dep: 'case',
        dict: 'は',
        head: 1,
        i: 2,
        norm: 'は',
        pos: 'ADP',
        reading: 'ハ',
        surface: 'は',
        tag: '助詞-係助詞',
      },
      {
        dep: 'ROOT',
        dict: '美しい',
        head: 3,
        i: 3,
        norm: '美しい',
        pos: 'ADJ',
        reading: 'ウツクシイ',
        surface: '美しい',
        tag: '形容詞-一般',
      },
      {
        dep: 'punct',
        dict: '。',
        head: 3,
        i: 4,
        norm: '。',
        pos: 'PUNCT',
        reading: '。',
        surface: '。',
        tag: '補助記号-句点',
      },
    ]);
  });
  it('ショックから元気を取り戻した。', async () => {
    expect.assertions(1);
    expect(await segment('ショックから元気を取り戻した。')).toEqual([
      {
        dep: 'obl',
        dict: 'ショック',
        head: 4,
        i: 0,
        norm: 'ショック',
        pos: 'NOUN',
        reading: 'ショック',
        surface: 'ショック',
        tag: '名詞-普通名詞-形状詞可能',
      },
      {
        dep: 'case',
        dict: 'から',
        head: 0,
        i: 1,
        norm: 'から',
        pos: 'ADP',
        reading: 'カラ',
        surface: 'から',
        tag: '助詞-格助詞',
      },
      {
        dep: 'obj',
        dict: '元気',
        head: 4,
        i: 2,
        norm: '元気',
        pos: 'NOUN',
        reading: 'ゲンキ',
        surface: '元気',
        tag: '名詞-普通名詞-形状詞可能',
      },
      {
        dep: 'case',
        dict: 'を',
        head: 2,
        i: 3,
        norm: 'を',
        pos: 'ADP',
        reading: 'ヲ',
        surface: 'を',
        tag: '助詞-格助詞',
      },
      {
        dep: 'advcl',
        dict: '取る',
        head: 5,
        i: 4,
        norm: '取る',
        pos: 'VERB',
        reading: 'トリ',
        surface: '取り',
        tag: '動詞-一般',
      },
      {
        dep: 'ROOT',
        dict: '戻す',
        head: 5,
        i: 5,
        norm: '戻す',
        pos: 'VERB',
        reading: 'モドシ',
        surface: '戻し',
        tag: '動詞-一般',
      },
      {
        dep: 'aux',
        dict: 'た',
        head: 5,
        i: 6,
        norm: 'た',
        pos: 'AUX',
        reading: 'タ',
        surface: 'た',
        tag: '助動詞',
      },
      {
        dep: 'ROOT',
        dict: '。',
        head: 7,
        i: 7,
        norm: '。',
        pos: 'PUNCT',
        reading: '。',
        surface: '。',
        tag: '補助記号-句点',
      },
    ]);
  });
  it('食べさせられたくなかった。', async () => {
    expect.assertions(1);
    expect(await segment('食べさせられたくなかった。')).toEqual([
      {
        dep: 'advcl',
        dict: '食べる',
        head: 4,
        i: 0,
        norm: '食べる',
        pos: 'VERB',
        reading: 'タベ',
        surface: '食べ',
        tag: '動詞-一般',
      },
      {
        dep: 'aux',
        dict: 'させる',
        head: 0,
        i: 1,
        norm: 'させる',
        pos: 'AUX',
        reading: 'サセ',
        surface: 'させ',
        tag: '助動詞',
      },
      {
        dep: 'aux',
        dict: 'られる',
        head: 0,
        i: 2,
        norm: 'られる',
        pos: 'AUX',
        reading: 'ラレ',
        surface: 'られ',
        tag: '助動詞',
      },
      {
        dep: 'aux',
        dict: 'たい',
        head: 0,
        i: 3,
        norm: 'たい',
        pos: 'AUX',
        reading: 'タク',
        surface: 'たく',
        tag: '助動詞',
      },
      {
        dep: 'ROOT',
        dict: 'ない',
        head: 4,
        i: 4,
        norm: '無い',
        pos: 'ADJ',
        reading: 'ナカッ',
        surface: 'なかっ',
        tag: '形容詞-非自立可能',
      },
      {
        dep: 'aux',
        dict: 'た',
        head: 4,
        i: 5,
        norm: 'た',
        pos: 'AUX',
        reading: 'タ',
        surface: 'た',
        tag: '助動詞',
      },
      {
        dep: 'punct',
        dict: '。',
        head: 4,
        i: 6,
        norm: '。',
        pos: 'PUNCT',
        reading: '。',
        surface: '。',
        tag: '補助記号-句点',
      },
    ]);
  });
  it('先生はお教えになります。', async () => {
    expect.assertions(1);
    expect(await segment('先生はお教えになります。')).toEqual([
      {
        dep: 'nsubj',
        dict: '先生',
        head: 5,
        i: 0,
        norm: '先生',
        pos: 'NOUN',
        reading: 'センセイ',
        surface: '先生',
        tag: '名詞-普通名詞-一般',
      },
      {
        dep: 'case',
        dict: 'は',
        head: 0,
        i: 1,
        norm: 'は',
        pos: 'ADP',
        reading: 'ハ',
        surface: 'は',
        tag: '助詞-係助詞',
      },
      {
        dep: 'compound',
        dict: 'お',
        head: 3,
        i: 2,
        norm: '御',
        pos: 'NOUN',
        reading: 'オ',
        surface: 'お',
        tag: '接頭辞',
      },
      {
        dep: 'obl',
        dict: '教える',
        head: 5,
        i: 3,
        norm: '教える',
        pos: 'NOUN',
        reading: 'オシエ',
        surface: '教え',
        tag: '動詞-一般',
      },
      {
        dep: 'case',
        dict: 'に',
        head: 3,
        i: 4,
        norm: 'に',
        pos: 'ADP',
        reading: 'ニ',
        surface: 'に',
        tag: '助詞-格助詞',
      },
      {
        dep: 'ROOT',
        dict: 'なる',
        head: 5,
        i: 5,
        norm: '成る',
        pos: 'VERB',
        reading: 'ナリ',
        surface: 'なり',
        tag: '動詞-非自立可能',
      },
      {
        dep: 'aux',
        dict: 'ます',
        head: 5,
        i: 6,
        norm: 'ます',
        pos: 'AUX',
        reading: 'マス',
        surface: 'ます',
        tag: '助動詞',
      },
      {
        dep: 'punct',
        dict: '。',
        head: 5,
        i: 7,
        norm: '。',
        pos: 'PUNCT',
        reading: '。',
        surface: '。',
        tag: '補助記号-句点',
      },
    ]);
  });
  it('line breaks', async () => {
    expect.assertions(1);
    expect(
      await segment('先生は\n日本の\n大学で\n英語を\nお教えになります。')
    ).toEqual([
      {
        dep: 'nsubj',
        dict: '先生',
        head: 15,
        i: 0,
        norm: '先生',
        pos: 'NOUN',
        reading: 'センセイ',
        surface: '先生',
        tag: '名詞-普通名詞-一般',
      },
      {
        dep: 'case',
        dict: 'は',
        head: 0,
        i: 1,
        norm: 'は',
        pos: 'ADP',
        reading: 'ハ',
        surface: 'は',
        tag: '助詞-係助詞',
      },
      {
        dep: 'dep',
        dict: '\n',
        head: 1,
        i: 2,
        norm: '\n',
        pos: 'SPACE',
        reading: null,
        surface: '\n',
        tag: 'SPACE',
      },
      {
        dep: 'nmod',
        dict: '日本',
        head: 6,
        i: 3,
        norm: '日本',
        pos: 'PROPN',
        reading: 'ニッポン',
        surface: '日本',
        tag: '名詞-固有名詞-地名-国',
      },
      {
        dep: 'case',
        dict: 'の',
        head: 3,
        i: 4,
        norm: 'の',
        pos: 'ADP',
        reading: 'ノ',
        surface: 'の',
        tag: '助詞-格助詞',
      },
      {
        dep: 'dep',
        dict: '\n',
        head: 4,
        i: 5,
        norm: '\n',
        pos: 'SPACE',
        reading: null,
        surface: '\n',
        tag: 'SPACE',
      },
      {
        dep: 'nmod',
        dict: '大学',
        head: 9,
        i: 6,
        norm: '大学',
        pos: 'NOUN',
        reading: 'ダイガク',
        surface: '大学',
        tag: '名詞-普通名詞-一般',
      },
      {
        dep: 'case',
        dict: 'で',
        head: 6,
        i: 7,
        norm: 'で',
        pos: 'ADP',
        reading: 'デ',
        surface: 'で',
        tag: '助詞-格助詞',
      },
      {
        dep: 'dep',
        dict: '\n',
        head: 7,
        i: 8,
        norm: '\n',
        pos: 'SPACE',
        reading: null,
        surface: '\n',
        tag: 'SPACE',
      },
      {
        dep: 'obj',
        dict: '英語',
        head: 15,
        i: 9,
        norm: '英語',
        pos: 'NOUN',
        reading: 'エイゴ',
        surface: '英語',
        tag: '名詞-普通名詞-一般',
      },
      {
        dep: 'case',
        dict: 'を',
        head: 9,
        i: 10,
        norm: 'を',
        pos: 'ADP',
        reading: 'ヲ',
        surface: 'を',
        tag: '助詞-格助詞',
      },
      {
        dep: 'dep',
        dict: '\n',
        head: 10,
        i: 11,
        norm: '\n',
        pos: 'SPACE',
        reading: null,
        surface: '\n',
        tag: 'SPACE',
      },
      {
        dep: 'compound',
        dict: 'お',
        head: 13,
        i: 12,
        norm: '御',
        pos: 'NOUN',
        reading: 'オ',
        surface: 'お',
        tag: '接頭辞',
      },
      {
        dep: 'obl',
        dict: '教える',
        head: 15,
        i: 13,
        norm: '教える',
        pos: 'NOUN',
        reading: 'オシエ',
        surface: '教え',
        tag: '動詞-一般',
      },
      {
        dep: 'case',
        dict: 'に',
        head: 13,
        i: 14,
        norm: 'に',
        pos: 'ADP',
        reading: 'ニ',
        surface: 'に',
        tag: '助詞-格助詞',
      },
      {
        dep: 'ROOT',
        dict: 'なる',
        head: 15,
        i: 15,
        norm: '成る',
        pos: 'VERB',
        reading: 'ナリ',
        surface: 'なり',
        tag: '動詞-非自立可能',
      },
      {
        dep: 'aux',
        dict: 'ます',
        head: 15,
        i: 16,
        norm: 'ます',
        pos: 'AUX',
        reading: 'マス',
        surface: 'ます',
        tag: '助動詞',
      },
      {
        dep: 'punct',
        dict: '。',
        head: 15,
        i: 17,
        norm: '。',
        pos: 'PUNCT',
        reading: '。',
        surface: '。',
        tag: '補助記号-句点',
      },
    ]);
  });
});