import { WordType } from './wordType';
import { FormalVerbTemplate, Template, NaiTemplate } from './templateTypes';
import { extendBasicTemplate } from './formHelpers';

// http://cghq.net/japanese/verbs/AMB_Japanese_Verbs.pdf

export const formalVerbTemplate: FormalVerbTemplate = {
  nonPast: 'ます',
  te: 'まして',
  ta: 'ました',
  volitional: 'ましょう',
  conditional: 'ますれば',
  imperative: ['なさい', 'な'],

  negative: 'ません',
  pastNegative: 'ませんでした',
};

export const naiTemplate: NaiTemplate = {
  nonPast: 'ない',
  te: 'なくて',
  ta: 'なかった',
  volitional: 'なかろう',
  conditional: 'なければ',
  kya: 'なきゃ',
  cha: 'なくちゃ',
};

export const templates: Template[] = [
  extendBasicTemplate({
    type: WordType.v5u,
    example: '言う',
    nonPast: 'う',
    masuStem: 'い',
    naiStem: 'わ',
    imperative: 'え',
    volitional: 'おう',
    te: 'って',
  }),
  extendBasicTemplate({
    type: WordType.v5u_s,
    example: '問う',
    nonPast: 'う',
    masuStem: 'い',
    naiStem: 'わ',
    imperative: 'え',
    volitional: 'おう',
    te: 'て',
  }),
  extendBasicTemplate({
    type: WordType.v5k,
    example: '聞く',
    nonPast: 'く',
    masuStem: 'き',
    naiStem: 'か',
    imperative: 'け',
    volitional: 'こう',
    te: 'いて',
  }),
  extendBasicTemplate({
    type: WordType.v5k_s,
    example: '行く',
    nonPast: 'く',
    masuStem: 'き',
    naiStem: 'か',
    imperative: 'け',
    volitional: 'こう',
    te: 'って',
  }),
  extendBasicTemplate({
    type: WordType.v5g,
    example: '泳ぐ',
    nonPast: 'ぐ',
    masuStem: 'ぎ',
    naiStem: 'が',
    imperative: 'げ',
    volitional: 'ごう',
    te: 'いで',
  }),
  extendBasicTemplate({
    type: WordType.v5s,
    example: '話す',
    nonPast: 'す',
    masuStem: 'し',
    naiStem: 'さ',
    imperative: 'せ',
    volitional: 'そう',
    te: 'して',
  }),
  extendBasicTemplate({
    type: WordType.v5t,
    example: '持つ',
    nonPast: 'つ',
    masuStem: 'ち',
    naiStem: 'た',
    imperative: 'て',
    volitional: 'とう',
    te: 'って',
  }),
  extendBasicTemplate({
    type: WordType.v5n,
    example: '死ぬ',
    nonPast: 'ぬ',
    masuStem: 'に',
    naiStem: 'な',
    imperative: 'ね',
    volitional: 'のう',
    te: 'んで',
  }),
  extendBasicTemplate({
    type: WordType.v5b,
    example: '飛ぶ',
    nonPast: 'ぶ',
    masuStem: 'び',
    naiStem: 'ば',
    imperative: 'べ',
    volitional: 'ぼう',
    te: 'んで',
  }),
  extendBasicTemplate({
    type: WordType.v5m,
    example: '飲む',
    nonPast: 'む',
    masuStem: 'み',
    naiStem: 'ま',
    imperative: 'め',
    volitional: 'もう',
    te: 'んで',
  }),
  extendBasicTemplate({
    type: WordType.v5r,
    example: '走る',
    nonPast: 'る',
    masuStem: 'り',
    naiStem: 'ら',
    imperative: 'れ',
    volitional: 'ろう',
    te: 'って',
  }),
  {
    ...extendBasicTemplate({
      type: WordType.v5r_i,
      example: '有る',
      nonPast: 'あ・る',
      masuStem: 'あ・り',
      naiStem: 'あ・ら',
      imperative: 'あ・れ',
      volitional: 'あ・ろう',
      te: 'あ・って',
    }),
    alt: ['有・る', '在・る'],
    negative: 'ない', // omission of ・ means that the original kanji will not be kept
  },
  {
    type: WordType.v5aru,
    example: '下さる',
    nonPast: 'る',
    negative: 'らない',
    te: 'って',
    ta: 'った',
    cha: 'っちゃ',
    formal: 'います',
    masuStem: ['い', 'り'],
    naiStem: 'ら',
    passive: 'られる',
    causative: ['らせる', 'らす'],
    passiveCausative: 'らせられる',
    potential: 'れる',
    imperative: 'い',
    volitional: 'ろう',
    conditional: 'れば',
  },
  extendBasicTemplate(
    {
      type: WordType.v1,
      example: '見る',
      nonPast: 'る',
      masuStem: '',
      naiStem: '',
      imperative: ['よ', 'ろ'],
      volitional: 'よう',
      te: 'て',
    },
    true
  ),
  extendBasicTemplate(
    {
      type: WordType.v1_s,
      example: '呉れる',
      nonPast: 'る',
      masuStem: '',
      naiStem: '',
      imperative: '',
      volitional: 'よう',
      te: 'て',
    },
    true
  ),
  {
    type: WordType.vs_i,
    example: '為る',
    alt: ['為・る'],
    nonPast: 'す・る',
    negative: 'し・ない',
    te: 'し・て',
    ta: 'し・た',
    cha: 'し・ちゃ',
    formal: 'し・ます',
    masuStem: 'し・',
    naiStem: 'せ・',
    passive: 'さ・れる',
    causative: ['さ・せる', 'さ・す'],
    passiveCausative: 'さ・せられる',
    potential: 'できる',
    imperative: ['し・ろ', 'せ・よ'],
    volitional: 'し・よう',
    conditional: 'す・れば',
  },
  {
    type: WordType.vs_s,
    example: '愛する',
    nonPast: 'する',
    negative: ['さない', 'しない'],
    te: 'して',
    ta: 'した',
    cha: 'しちゃ',
    formal: 'します',
    masuStem: 'し',
    naiStem: ['さ', 'し'],
    passive: 'される',
    causative: ['させる', 'さす'],
    passiveCausative: 'させられる',
    potential: 'せる',
    imperative: ['せ', 'しろ', 'せよ'],
    volitional: ['そう', 'しよう'],
    conditional: ['すれば', 'せば'],
  },
  {
    type: WordType.vk,
    example: '来る',
    alt: ['来・る'],
    nonPast: 'く・る',
    negative: 'こ・ない',
    te: 'き・て',
    ta: 'き・た',
    cha: 'き・ちゃ',
    formal: 'き・ます',
    masuStem: 'き・',
    naiStem: 'こ・',
    passive: 'こ・られる',
    causative: ['こ・させる', 'こ・さす'],
    passiveCausative: 'こ・させられる',
    potential: ['こ・られる', 'こ・れる'],
    imperative: 'こ・い',
    volitional: 'こ・よう',
    conditional: 'く・れば',
  },

  {
    type: WordType.adj_i,
    example: '高い',
    nonPast: 'い',
    negative: 'くない',
    te: 'くて',
    ta: 'かった',
    cha: 'くちゃ',
    conditional: 'ければ',
    adverbial: 'く',
    prenominal: 'い',
    formal: 'いです',
    formalNegative: ['くありません', 'くないです'],
    formalPast: 'かったです',
    formalPastNegative: ['くありませんでした', 'くなかったです'],
  },
  {
    type: WordType.adj_ix,
    example: '良い',
    alt: ['良・い'],
    nonPast: 'い・い',
    negative: 'よ・くない',
    te: 'よ・くて',
    ta: 'よ・かった',
    cha: 'よ・くちゃ',
    conditional: 'よ・ければ',
    adverbial: 'よ・く',
    prenominal: 'い・い',
    formal: 'い・いです',
    formalNegative: ['よ・くありません', 'よ・くないです'],
    formalPast: 'よ・かったです',
    formalPastNegative: ['よ・くありませんでした', 'よ・くなかったです'],
  },

  {
    type: WordType.cop,
    example: 'だ',
    nonPast: 'だ',
    negative: ['ではない', 'じゃない'],
    te: 'で',
    ta: 'だった',
    conditional: ['であれば', 'ならば', 'なら'],
    prenominal: ['の', 'である'],
    formal: 'です',
    formalNegative: ['ではありません', 'じゃありません'],
    formalPast: 'でした',
    formalPastNegative: ['ではありませんでした', 'じゃありませんでした'],
  },
];

export const templatesDict: Partial<Record<WordType, Template>> =
  Object.fromEntries(templates.map((item) => [item.type, item]));
