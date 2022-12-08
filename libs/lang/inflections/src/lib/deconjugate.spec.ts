import { dictionaryLoadWordsFromFile } from '@analyzer/lang/dictionary';
import { deconjugate } from './deconjugate';

describe('deconjugate', () => {
  beforeAll(dictionaryLoadWordsFromFile);
  describe('言う', () => {
    it('nonPast', () => {
      expect(deconjugate('言う')).toEqual([
        {
          conjugation: ['nonPast'],
          dict: '言う',
          root: '言',
          suffix: 'う',
          type: 'v5u',
        },
      ]);
    });
    it('negative', () => {
      expect(deconjugate('言わない')).toEqual([
        {
          conjugation: ['negative'],
          dict: '言う',
          root: '言',
          suffix: 'わない',
          type: 'v5u',
        },
      ]);
    });
    it('formal', () => {
      expect(deconjugate('言います')).toEqual([
        {
          conjugation: ['formal'],
          dict: '言う',
          root: '言',
          suffix: 'います',
          type: 'v5u',
        },
      ]);
    });
    it('formal -> negative', () => {
      expect(deconjugate('言いません')).toEqual([
        {
          conjugation: ['formal', 'negative'],
          dict: '言う',
          root: '言',
          suffix: 'いません',
          type: 'v5u',
        },
      ]);
    });
    it('volitional', () => {
      expect(deconjugate('言おう')).toEqual([
        {
          conjugation: ['volitional'],
          dict: '言う',
          root: '言',
          suffix: 'おう',
          type: 'v5u',
        },
      ]);
    });
    it('negative -> volitional', () => {
      expect(deconjugate('言わなかろう')).toEqual([
        {
          conjugation: ['negative', 'volitional'],
          dict: '言う',
          root: '言',
          suffix: 'わなかろう',
          type: 'v5u',
        },
      ]);
    });
    it('formal -> volitional', () => {
      expect(deconjugate('言いましょう')).toEqual([
        {
          conjugation: ['formal', 'volitional'],
          dict: '言う',
          root: '言',
          suffix: 'いましょう',
          type: 'v5u',
        },
      ]);
    });
    it('imperative', () => {
      expect(deconjugate('言え')).toEqual([
        {
          conjugation: ['imperative'],
          dict: '言う',
          root: '言',
          suffix: 'え',
          type: 'v5u',
        },
        {
          conjugation: ['potential', 'naiStem'],
          dict: '言う',
          root: '言',
          suffix: 'え',
          type: 'v5u',
        },
        {
          conjugation: ['potential', 'masuStem'],
          dict: '言う',
          root: '言',
          suffix: 'え',
          type: 'v5u',
        },
        {
          conjugation: ['naiStem'],
          dict: '言える',
          root: '言え',
          suffix: '',
          type: 'v1',
        },
        {
          conjugation: ['masuStem'],
          dict: '言える',
          root: '言え',
          suffix: '',
          type: 'v1',
        },
      ]);
    });
    it('formal -> imperative', () => {
      expect(deconjugate('言いなさい')).toEqual([
        {
          conjugation: ['formal', 'imperative'],
          dict: '言う',
          root: '言',
          suffix: 'いなさい',
          type: 'v5u',
        },
      ]);
    });
    it('past', () => {
      expect(deconjugate('言った')).toEqual([
        {
          conjugation: ['ta'],
          dict: '言う',
          root: '言',
          suffix: 'った',
          type: 'v5u',
        },
      ]);
    });
    it('negative -> past', () => {
      expect(deconjugate('言わなかった')).toEqual([
        {
          conjugation: ['negative', 'ta'],
          dict: '言う',
          root: '言',
          suffix: 'わなかった',
          type: 'v5u',
        },
      ]);
    });
    it('formal -> past', () => {
      expect(deconjugate('言いました')).toEqual([
        {
          conjugation: ['formal', 'ta'],
          dict: '言う',
          root: '言',
          suffix: 'いました',
          type: 'v5u',
        },
      ]);
    });
    it('formal -> pastNegative', () => {
      expect(deconjugate('言いませんでした')).toEqual([
        {
          conjugation: ['formal', 'pastNegative'],
          dict: '言う',
          root: '言',
          suffix: 'いませんでした',
          type: 'v5u',
        },
      ]);
    });
    it('conditional', () => {
      expect(deconjugate('言えば')).toEqual([
        {
          conjugation: ['conditional'],
          dict: '言う',
          root: '言',
          suffix: 'えば',
          type: 'v5u',
        },
      ]);
    });
    it('negative -> conditional', () => {
      expect(deconjugate('言わなければ')).toEqual([
        {
          conjugation: ['negative', 'conditional'],
          dict: '言う',
          root: '言',
          suffix: 'わなければ',
          type: 'v5u',
        },
      ]);
    });
    it('formal -> conditional', () => {
      expect(deconjugate('言いますれば')).toEqual([
        {
          conjugation: ['formal', 'conditional'],
          dict: '言う',
          root: '言',
          suffix: 'いますれば',
          type: 'v5u',
        },
      ]);
    });
    it('potential', () => {
      expect(deconjugate('言える')).toEqual([
        {
          conjugation: ['potential', 'nonPast'],
          dict: '言う',
          root: '言',
          suffix: 'える',
          type: 'v5u',
        },
        {
          conjugation: ['nonPast'],
          dict: '言える',
          root: '言え',
          suffix: 'る',
          type: 'v1',
        },
      ]);
    });
    it('potential -> negative', () => {
      expect(deconjugate('言えない')).toEqual([
        {
          conjugation: ['potential', 'negative'],
          dict: '言う',
          root: '言',
          suffix: 'えない',
          type: 'v5u',
        },
        {
          conjugation: ['negative'],
          dict: '言える',
          root: '言え',
          suffix: 'ない',
          type: 'v1',
        },
      ]);
    });
    it('potential -> formal', () => {
      expect(deconjugate('言えます')).toEqual([
        {
          conjugation: ['potential', 'formal'],
          dict: '言う',
          root: '言',
          suffix: 'えます',
          type: 'v5u',
        },
        {
          conjugation: ['formal'],
          dict: '言える',
          root: '言え',
          suffix: 'ます',
          type: 'v1',
        },
      ]);
    });
    it('potential -> formal -> negative', () => {
      expect(deconjugate('言えません')).toEqual([
        {
          conjugation: ['potential', 'formal', 'negative'],
          dict: '言う',
          root: '言',
          suffix: 'えません',
          type: 'v5u',
        },
        {
          conjugation: ['formal', 'negative'],
          dict: '言える',
          root: '言え',
          suffix: 'ません',
          type: 'v1',
        },
      ]);
    });
    it('causative', () => {
      expect(deconjugate('言わせる')).toEqual([
        {
          conjugation: ['causative', 'nonPast'],
          dict: '言う',
          root: '言',
          suffix: 'わせる',
          type: 'v5u',
        },
        {
          conjugation: ['potential', 'nonPast'],
          dict: '言わす',
          root: '言わ',
          suffix: 'せる',
          type: 'v5s',
        },
      ]);
    });
    it('causative -> negative', () => {
      expect(deconjugate('言わせない')).toEqual([
        {
          conjugation: ['causative', 'negative'],
          dict: '言う',
          root: '言',
          suffix: 'わせない',
          type: 'v5u',
        },
        {
          conjugation: ['potential', 'negative'],
          dict: '言わす',
          root: '言わ',
          suffix: 'せない',
          type: 'v5s',
        },
      ]);
    });
    it('causative -> formal', () => {
      expect(deconjugate('言わせます')).toEqual([
        {
          conjugation: ['causative', 'formal'],
          dict: '言う',
          root: '言',
          suffix: 'わせます',
          type: 'v5u',
        },
        {
          conjugation: ['potential', 'formal'],
          dict: '言わす',
          root: '言わ',
          suffix: 'せます',
          type: 'v5s',
        },
      ]);
    });
    it('causative -> formal -> negative', () => {
      expect(deconjugate('言わせません')).toEqual([
        {
          conjugation: ['causative', 'formal', 'negative'],
          dict: '言う',
          root: '言',
          suffix: 'わせません',
          type: 'v5u',
        },
        {
          conjugation: ['potential', 'formal', 'negative'],
          dict: '言わす',
          root: '言わ',
          suffix: 'せません',
          type: 'v5s',
        },
      ]);
    });
    it('passive', () => {
      expect(deconjugate('言われる')).toEqual([
        {
          conjugation: ['passive', 'nonPast'],
          dict: '言う',
          root: '言',
          suffix: 'われる',
          type: 'v5u',
        },
      ]);
    });
    it('passive -> negative', () => {
      expect(deconjugate('言われない')).toEqual([
        {
          conjugation: ['passive', 'negative'],
          dict: '言う',
          root: '言',
          suffix: 'われない',
          type: 'v5u',
        },
      ]);
    });
    it('passive -> formal', () => {
      expect(deconjugate('言われます')).toEqual([
        {
          conjugation: ['passive', 'formal'],
          dict: '言う',
          root: '言',
          suffix: 'われます',
          type: 'v5u',
        },
      ]);
    });
    it('passive -> formal -> negative', () => {
      expect(deconjugate('言われません')).toEqual([
        {
          conjugation: ['passive', 'formal', 'negative'],
          dict: '言う',
          root: '言',
          suffix: 'われません',
          type: 'v5u',
        },
      ]);
    });
    it('passiveCausative', () => {
      expect(deconjugate('言わせられる')).toEqual([
        {
          conjugation: ['passiveCausative', 'nonPast'],
          dict: '言う',
          root: '言',
          suffix: 'わせられる',
          type: 'v5u',
        },
      ]);
    });
    it('passiveCausative -> negative', () => {
      expect(deconjugate('言わせられない')).toEqual([
        {
          conjugation: ['passiveCausative', 'negative'],
          dict: '言う',
          root: '言',
          suffix: 'わせられない',
          type: 'v5u',
        },
      ]);
    });
    it('passiveCausative -> formal', () => {
      expect(deconjugate('言わせられます')).toEqual([
        {
          conjugation: ['passiveCausative', 'formal'],
          dict: '言う',
          root: '言',
          suffix: 'わせられます',
          type: 'v5u',
        },
      ]);
    });
    it('passiveCausative -> formal -> negative', () => {
      expect(deconjugate('言わせられません')).toEqual([
        {
          conjugation: ['passiveCausative', 'formal', 'negative'],
          dict: '言う',
          root: '言',
          suffix: 'わせられません',
          type: 'v5u',
        },
      ]);
    });
  });

  describe('教える', () => {
    it('masuStem', () => {
      expect(deconjugate('教え', '教える')).toEqual([
        {
          conjugation: ['naiStem'],
          dict: '教える',
          root: '教え',
          suffix: '',
          type: 'v1',
        },
        {
          conjugation: ['masuStem'],
          dict: '教える',
          root: '教え',
          suffix: '',
          type: 'v1',
        },
      ]);
    });
  });

  describe('食べる', () => {
    it('nonPast', () => {
      expect(deconjugate('食べる')).toEqual([
        {
          conjugation: ['nonPast'],
          dict: '食べる',
          root: '食べ',
          suffix: 'る',
          type: 'v1',
        },
      ]);
    });
    it('negative', () => {
      expect(deconjugate('食べない')).toEqual([
        {
          conjugation: ['negative'],
          dict: '食べる',
          root: '食べ',
          suffix: 'ない',
          type: 'v1',
        },
      ]);
    });
    it('formal', () => {
      expect(deconjugate('食べます')).toEqual([
        {
          conjugation: ['formal'],
          dict: '食べる',
          root: '食べ',
          suffix: 'ます',
          type: 'v1',
        },
      ]);
    });
    it('formal -> negative', () => {
      expect(deconjugate('食べません')).toEqual([
        {
          root: '食べ',
          suffix: 'ません',
          dict: '食べる',
          type: 'v1',
          conjugation: ['formal', 'negative'],
        },
      ]);
    });
    it('volitional', () => {
      expect(deconjugate('食べよう')).toEqual([
        {
          root: '食べ',
          suffix: 'よう',
          dict: '食べる',
          type: 'v1',
          conjugation: ['volitional'],
        },
      ]);
    });
    it('negative -> volitional', () => {
      expect(deconjugate('食べなかろう')).toEqual([
        {
          root: '食べ',
          suffix: 'なかろう',
          dict: '食べる',
          type: 'v1',
          conjugation: ['negative', 'volitional'],
        },
      ]);
    });
    it('formal -> volitional', () => {
      expect(deconjugate('食べましょう')).toEqual([
        {
          root: '食べ',
          suffix: 'ましょう',
          dict: '食べる',
          type: 'v1',
          conjugation: ['formal', 'volitional'],
        },
      ]);
    });
    it('imperative', () => {
      expect(deconjugate('食べよ')).toEqual([
        {
          root: '食べ',
          suffix: 'よ',
          dict: '食べる',
          type: 'v1',
          conjugation: ['imperative'],
        },
      ]);
    });
    it('formal -> imperative', () => {
      expect(deconjugate('食べなさい')).toEqual([
        {
          root: '食べ',
          suffix: 'なさい',
          dict: '食べる',
          type: 'v1',
          conjugation: ['formal', 'imperative'],
        },
      ]);
    });
    it('past', () => {
      expect(deconjugate('食べた')).toEqual([
        {
          root: '食べ',
          suffix: 'た',
          dict: '食べる',
          type: 'v1',
          conjugation: ['ta'],
        },
      ]);
    });
    it('negative -> past', () => {
      expect(deconjugate('食べなかった')).toEqual([
        {
          root: '食べ',
          suffix: 'なかった',
          dict: '食べる',
          type: 'v1',
          conjugation: ['negative', 'ta'],
        },
      ]);
    });
    it('formal -> past', () => {
      expect(deconjugate('食べました')).toEqual([
        {
          root: '食べ',
          suffix: 'ました',
          dict: '食べる',
          type: 'v1',
          conjugation: ['formal', 'ta'],
        },
      ]);
    });
    it('formal -> pastNegative', () => {
      expect(deconjugate('食べませんでした')).toEqual([
        {
          root: '食べ',
          suffix: 'ませんでした',
          dict: '食べる',
          type: 'v1',
          conjugation: ['formal', 'pastNegative'],
        },
      ]);
    });
    it('conditional', () => {
      expect(deconjugate('食べれば')).toEqual([
        {
          root: '食べ',
          suffix: 'れば',
          dict: '食べる',
          type: 'v1',
          conjugation: ['conditional'],
        },
      ]);
    });
    it('negative -> conditional', () => {
      expect(deconjugate('食べなければ')).toEqual([
        {
          root: '食べ',
          suffix: 'なければ',
          dict: '食べる',
          type: 'v1',
          conjugation: ['negative', 'conditional'],
        },
      ]);
    });
    it('formal -> conditional', () => {
      expect(deconjugate('食べますれば')).toEqual([
        {
          root: '食べ',
          suffix: 'ますれば',
          dict: '食べる',
          type: 'v1',
          conjugation: ['formal', 'conditional'],
        },
      ]);
    });
    it('potential', () => {
      expect(deconjugate('食べられる')).toEqual([
        {
          conjugation: ['passive', 'nonPast'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られる',
          type: 'v1',
        },
        {
          conjugation: ['potential', 'nonPast'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られる',
          type: 'v1',
        },
        {
          conjugation: ['nonPast'],
          dict: '食べられる',
          root: '食べられ',
          suffix: 'る',
          type: 'v1',
        },
      ]);
    });
    it('potential -> negative', () => {
      expect(deconjugate('食べられない')).toEqual([
        {
          conjugation: ['passive', 'negative'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られない',
          type: 'v1',
        },
        {
          conjugation: ['potential', 'negative'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られない',
          type: 'v1',
        },
        {
          conjugation: ['negative'],
          dict: '食べられる',
          root: '食べられ',
          suffix: 'ない',
          type: 'v1',
        },
      ]);
    });
    it('potential -> formal', () => {
      expect(deconjugate('食べられます')).toEqual([
        {
          conjugation: ['passive', 'formal'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られます',
          type: 'v1',
        },
        {
          conjugation: ['potential', 'formal'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られます',
          type: 'v1',
        },
        {
          conjugation: ['formal'],
          dict: '食べられる',
          root: '食べられ',
          suffix: 'ます',
          type: 'v1',
        },
      ]);
    });
    it('potential -> formal -> negative', () => {
      expect(deconjugate('食べられません')).toEqual([
        {
          conjugation: ['passive', 'formal', 'negative'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られません',
          type: 'v1',
        },
        {
          conjugation: ['potential', 'formal', 'negative'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られません',
          type: 'v1',
        },
        {
          conjugation: ['formal', 'negative'],
          dict: '食べられる',
          root: '食べられ',
          suffix: 'ません',
          type: 'v1',
        },
      ]);
    });
    it('causative', () => {
      expect(deconjugate('食べさせる')).toEqual([
        {
          conjugation: ['causative', 'nonPast'],
          dict: '食べる',
          root: '食べ',
          suffix: 'させる',
          type: 'v1',
        },
      ]);
    });
    it('causative -> negative', () => {
      expect(deconjugate('食べさせない')).toEqual([
        {
          root: '食べ',
          suffix: 'させない',
          dict: '食べる',
          type: 'v1',
          conjugation: ['causative', 'negative'],
        },
      ]);
    });
    it('causative -> formal', () => {
      expect(deconjugate('食べさせます')).toEqual([
        {
          root: '食べ',
          suffix: 'させます',
          dict: '食べる',
          type: 'v1',
          conjugation: ['causative', 'formal'],
        },
      ]);
    });
    it('causative -> formal -> negative', () => {
      expect(deconjugate('食べさせません')).toEqual([
        {
          root: '食べ',
          suffix: 'させません',
          dict: '食べる',
          type: 'v1',
          conjugation: ['causative', 'formal', 'negative'],
        },
      ]);
    });
    it('passive', () => {
      expect(deconjugate('食べられる')).toEqual([
        {
          conjugation: ['passive', 'nonPast'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られる',
          type: 'v1',
        },
        {
          conjugation: ['potential', 'nonPast'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られる',
          type: 'v1',
        },
        {
          conjugation: ['nonPast'],
          dict: '食べられる',
          root: '食べられ',
          suffix: 'る',
          type: 'v1',
        },
      ]);
    });
    it('passive -> negative', () => {
      expect(deconjugate('食べられない')).toEqual([
        {
          conjugation: ['passive', 'negative'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られない',
          type: 'v1',
        },
        {
          conjugation: ['potential', 'negative'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られない',
          type: 'v1',
        },
        {
          conjugation: ['negative'],
          dict: '食べられる',
          root: '食べられ',
          suffix: 'ない',
          type: 'v1',
        },
      ]);
    });
    it('passive -> formal', () => {
      expect(deconjugate('食べられます')).toEqual([
        {
          conjugation: ['passive', 'formal'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られます',
          type: 'v1',
        },
        {
          conjugation: ['potential', 'formal'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られます',
          type: 'v1',
        },
        {
          conjugation: ['formal'],
          dict: '食べられる',
          root: '食べられ',
          suffix: 'ます',
          type: 'v1',
        },
      ]);
    });
    it('passive -> formal -> negative', () => {
      expect(deconjugate('食べられません')).toEqual([
        {
          conjugation: ['passive', 'formal', 'negative'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られません',
          type: 'v1',
        },
        {
          conjugation: ['potential', 'formal', 'negative'],
          dict: '食べる',
          root: '食べ',
          suffix: 'られません',
          type: 'v1',
        },
        {
          conjugation: ['formal', 'negative'],
          dict: '食べられる',
          root: '食べられ',
          suffix: 'ません',
          type: 'v1',
        },
      ]);
    });
    it('passiveCausative', () => {
      expect(deconjugate('食べさせられる')).toEqual([
        {
          conjugation: ['passiveCausative', 'nonPast'],
          dict: '食べる',
          root: '食べ',
          suffix: 'させられる',
          type: 'v1',
        },
      ]);
    });
    it('passiveCausative -> negative', () => {
      expect(deconjugate('食べさせられない')).toEqual([
        {
          root: '食べ',
          suffix: 'させられない',
          dict: '食べる',
          type: 'v1',
          conjugation: ['passiveCausative', 'negative'],
        },
      ]);
    });
    it('passiveCausative -> formal', () => {
      expect(deconjugate('食べさせられます')).toEqual([
        {
          root: '食べ',
          suffix: 'させられます',
          dict: '食べる',
          type: 'v1',
          conjugation: ['passiveCausative', 'formal'],
        },
      ]);
    });
    it('passiveCausative -> formal -> negative', () => {
      expect(deconjugate('食べさせられません')).toEqual([
        {
          root: '食べ',
          suffix: 'させられません',
          dict: '食べる',
          type: 'v1',
          conjugation: ['passiveCausative', 'formal', 'negative'],
        },
      ]);
    });
  });

  describe('有る', () => {
    it('ある - negative', () => {
      expect(deconjugate('ない')).toEqual([
        {
          conjugation: ['negative'],
          dict: 'ある',
          root: '',
          suffix: 'ない',
          type: 'v5r-i',
        },
        {
          conjugation: ['negative'],
          dict: 'ある',
          root: '',
          suffix: 'ない',
          type: 'v5r-i',
        },
        {
          conjugation: ['negative'],
          dict: 'ある',
          root: '',
          suffix: 'ない',
          type: 'v5r-i',
        },
        {
          conjugation: ['masuStem'],
          dict: 'なう',
          root: 'な',
          suffix: 'い',
          type: 'v5u',
        },
        {
          conjugation: ['nonPast'],
          dict: 'ない',
          root: 'な',
          suffix: 'い',
          type: 'adj-i',
        },
        {
          conjugation: ['prenominal'],
          dict: 'ない',
          root: 'な',
          suffix: 'い',
          type: 'adj-i',
        },
      ]);
    });
  });
  describe('為る', () => {
    it('為る - negative', () => {
      expect(deconjugate('為ない')).toEqual([
        {
          root: '為',
          suffix: 'ない',
          dict: '為る',
          type: 'vs-i',
          conjugation: ['negative'],
        },
      ]);
    });
    it('する - negative', () => {
      expect(deconjugate('しない')).toEqual([
        {
          conjugation: ['negative'],
          dict: 'する',
          root: 'し',
          suffix: 'ない',
          type: 'vs-i',
        },
        {
          conjugation: ['masuStem'],
          dict: 'しなう',
          root: 'しな',
          suffix: 'い',
          type: 'v5u',
        },
      ]);
    });
  });
  describe('来る', () => {
    it('来る - negative', () => {
      expect(deconjugate('来ない')).toEqual([
        {
          root: '来',
          suffix: 'ない',
          dict: '来る',
          type: 'vk',
          conjugation: ['negative'],
        },
      ]);
    });
    it('くる - negative', () => {
      expect(deconjugate('こない')).toEqual([
        {
          root: 'こ',
          suffix: 'ない',
          dict: 'くる',
          type: 'vk',
          conjugation: ['negative'],
        },
      ]);
    });
  });

  describe('忙しい', () => {
    it('negative -> conditional ', () => {
      expect(deconjugate('忙しくなければ')).toEqual([
        {
          conjugation: ['negative', 'conditional'],
          dict: '忙しい',
          root: '忙し',
          suffix: 'くなければ',
          type: 'adj-i',
        },
      ]);
    });
  });
});
