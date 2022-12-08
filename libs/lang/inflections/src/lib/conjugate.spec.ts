import { dictionaryLoadWordsFromFile } from '@analyzer/lang/dictionary';
import { conjugate } from './conjugate';
import { WordType } from './wordType';
import {
  AdjectiveForm,
  FormalVerbForm,
  NaiForm,
  VerbForm,
} from '@analyzer/lang/inflections';

describe('conjugate', () => {
  beforeAll(dictionaryLoadWordsFromFile);
  describe('言う', () => {
    it('nonPast', () => {
      expect(conjugate('言う', [VerbForm.nonPast])).toEqual('言う');
    });
    it('negative', () => {
      expect(conjugate('言う', [VerbForm.negative])).toEqual('言わない');
    });
    it('formal', () => {
      expect(conjugate('言う', [VerbForm.formal])).toEqual('言います');
    });
    it('formal -> negative', () => {
      expect(
        conjugate('言う', [VerbForm.formal, FormalVerbForm.negative])
      ).toEqual('言いません');
    });
    it('volitional', () => {
      expect(conjugate('言う', [VerbForm.volitional])).toEqual('言おう');
    });
    it('negative -> volitional', () => {
      expect(
        conjugate('言う', [VerbForm.negative, NaiForm.volitional])
      ).toEqual('言わなかろう');
    });
    it('formal -> volitional', () => {
      expect(
        conjugate('言う', [VerbForm.formal, FormalVerbForm.volitional])
      ).toEqual('言いましょう');
    });
    it('imperative', () => {
      expect(conjugate('言う', [VerbForm.imperative])).toEqual('言え');
    });
    it('formal -> imperative', () => {
      expect(
        conjugate('言う', [VerbForm.formal, FormalVerbForm.imperative])
      ).toEqual('言いなさい');
    });
    it('past', () => {
      expect(conjugate('言う', [VerbForm.ta])).toEqual('言った');
    });
    it('negative -> past', () => {
      expect(conjugate('言う', [VerbForm.negative, NaiForm.ta])).toEqual(
        '言わなかった'
      );
    });
    it('formal -> past', () => {
      expect(conjugate('言う', [VerbForm.formal, FormalVerbForm.ta])).toEqual(
        '言いました'
      );
    });
    it('formal -> pastNegative', () => {
      expect(
        conjugate('言う', [VerbForm.formal, FormalVerbForm.pastNegative])
      ).toEqual('言いませんでした');
    });
    it('conditional', () => {
      expect(conjugate('言う', [VerbForm.conditional])).toEqual('言えば');
    });
    it('negative -> conditional', () => {
      expect(
        conjugate('言う', [VerbForm.negative, NaiForm.conditional])
      ).toEqual('言わなければ');
    });
    it('formal -> conditional', () => {
      expect(
        conjugate('言う', [VerbForm.formal, FormalVerbForm.conditional])
      ).toEqual('言いますれば');
    });
    it('potential', () => {
      expect(conjugate('言う', [VerbForm.potential])).toEqual('言える');
    });
    it('potential -> negative', () => {
      expect(
        conjugate('言う', [VerbForm.potential, VerbForm.negative])
      ).toEqual('言えない');
    });
    it('potential -> formal', () => {
      expect(conjugate('言う', [VerbForm.potential, VerbForm.formal])).toEqual(
        '言えます'
      );
    });
    it('potential -> formal -> negative', () => {
      expect(
        conjugate('言う', [
          VerbForm.potential,
          VerbForm.formal,
          FormalVerbForm.negative,
        ])
      ).toEqual('言えません');
    });
    it('causative', () => {
      expect(conjugate('言う', [VerbForm.causative])).toEqual('言わせる');
    });
    it('causative -> negative', () => {
      expect(
        conjugate('言う', [VerbForm.causative, VerbForm.negative])
      ).toEqual('言わせない');
    });
    it('causative -> formal', () => {
      expect(conjugate('言う', [VerbForm.causative, VerbForm.formal])).toEqual(
        '言わせます'
      );
    });
    it('causative -> formal -> negative', () => {
      expect(
        conjugate('言う', [
          VerbForm.causative,
          VerbForm.formal,
          FormalVerbForm.negative,
        ])
      ).toEqual('言わせません');
    });
    it('passive', () => {
      expect(conjugate('言う', [VerbForm.passive])).toEqual('言われる');
    });
    it('passive -> negative', () => {
      expect(conjugate('言う', [VerbForm.passive, VerbForm.negative])).toEqual(
        '言われない'
      );
    });
    it('passive -> formal', () => {
      expect(conjugate('言う', [VerbForm.passive, VerbForm.formal])).toEqual(
        '言われます'
      );
    });
    it('passive -> formal -> negative', () => {
      expect(
        conjugate('言う', [
          VerbForm.passive,
          VerbForm.formal,
          FormalVerbForm.negative,
        ])
      ).toEqual('言われません');
    });
    it('passiveCausative', () => {
      expect(conjugate('言う', [VerbForm.passiveCausative])).toEqual(
        '言わせられる'
      );
    });
    it('passiveCausative -> negative', () => {
      expect(
        conjugate('言う', [VerbForm.passiveCausative, VerbForm.negative])
      ).toEqual('言わせられない');
    });
    it('passiveCausative -> formal', () => {
      expect(
        conjugate('言う', [VerbForm.passiveCausative, VerbForm.formal])
      ).toEqual('言わせられます');
    });
    it('passiveCausative -> formal -> negative', () => {
      expect(
        conjugate('言う', [
          VerbForm.passiveCausative,
          VerbForm.formal,
          FormalVerbForm.negative,
        ])
      ).toEqual('言わせられません');
    });
  });

  describe('食べる', () => {
    it('nonPast', () => {
      expect(conjugate('食べる', [VerbForm.nonPast])).toEqual('食べる');
    });
    it('negative', () => {
      expect(conjugate('食べる', [VerbForm.negative])).toEqual('食べない');
    });
    it('formal', () => {
      expect(conjugate('食べる', [VerbForm.formal])).toEqual('食べます');
    });
    it('formal -> negative', () => {
      expect(
        conjugate('食べる', [VerbForm.formal, FormalVerbForm.negative])
      ).toEqual('食べません');
    });
    it('volitional', () => {
      expect(conjugate('食べる', [VerbForm.volitional])).toEqual('食べよう');
    });
    it('negative -> volitional', () => {
      expect(
        conjugate('食べる', [VerbForm.negative, NaiForm.volitional])
      ).toEqual('食べなかろう');
    });
    it('formal -> volitional', () => {
      expect(
        conjugate('食べる', [VerbForm.formal, FormalVerbForm.volitional])
      ).toEqual('食べましょう');
    });
    it('imperative', () => {
      expect(conjugate('食べる', [VerbForm.imperative])).toEqual('食べよ');
    });
    it('formal -> imperative', () => {
      expect(
        conjugate('食べる', [VerbForm.formal, FormalVerbForm.imperative])
      ).toEqual('食べなさい');
    });
    it('past', () => {
      expect(conjugate('食べる', [VerbForm.ta])).toEqual('食べた');
    });
    it('negative -> past', () => {
      expect(conjugate('食べる', [VerbForm.negative, NaiForm.ta])).toEqual(
        '食べなかった'
      );
    });
    it('formal -> past', () => {
      expect(conjugate('食べる', [VerbForm.formal, FormalVerbForm.ta])).toEqual(
        '食べました'
      );
    });
    it('formal -> pastNegative', () => {
      expect(
        conjugate('食べる', [VerbForm.formal, FormalVerbForm.pastNegative])
      ).toEqual('食べませんでした');
    });
    it('conditional', () => {
      expect(conjugate('食べる', [VerbForm.conditional])).toEqual('食べれば');
    });
    it('negative -> conditional', () => {
      expect(
        conjugate('食べる', [VerbForm.negative, NaiForm.conditional])
      ).toEqual('食べなければ');
    });
    it('formal -> conditional', () => {
      expect(
        conjugate('食べる', [VerbForm.formal, FormalVerbForm.conditional])
      ).toEqual('食べますれば');
    });
    it('potential', () => {
      expect(conjugate('食べる', [VerbForm.potential])).toEqual('食べられる');
    });
    it('potential -> negative', () => {
      expect(
        conjugate('食べる', [VerbForm.potential, VerbForm.negative])
      ).toEqual('食べられない');
    });
    it('potential -> formal', () => {
      expect(
        conjugate('食べる', [VerbForm.potential, VerbForm.formal])
      ).toEqual('食べられます');
    });
    it('potential -> formal -> negative', () => {
      expect(
        conjugate('食べる', [
          VerbForm.potential,
          VerbForm.formal,
          FormalVerbForm.negative,
        ])
      ).toEqual('食べられません');
    });
    it('causative', () => {
      expect(conjugate('食べる', [VerbForm.causative])).toEqual('食べさせる');
    });
    it('causative -> negative', () => {
      expect(
        conjugate('食べる', [VerbForm.causative, VerbForm.negative])
      ).toEqual('食べさせない');
    });
    it('causative -> formal', () => {
      expect(
        conjugate('食べる', [VerbForm.causative, VerbForm.formal])
      ).toEqual('食べさせます');
    });
    it('causative -> formal -> negative', () => {
      expect(
        conjugate('食べる', [
          VerbForm.causative,
          VerbForm.formal,
          FormalVerbForm.negative,
        ])
      ).toEqual('食べさせません');
    });
    it('passive', () => {
      expect(conjugate('食べる', [VerbForm.passive])).toEqual('食べられる');
    });
    it('passive -> negative', () => {
      expect(
        conjugate('食べる', [VerbForm.passive, VerbForm.negative])
      ).toEqual('食べられない');
    });
    it('passive -> formal', () => {
      expect(conjugate('食べる', [VerbForm.passive, VerbForm.formal])).toEqual(
        '食べられます'
      );
    });
    it('passive -> formal -> negative', () => {
      expect(
        conjugate('食べる', [
          VerbForm.passive,
          VerbForm.formal,
          FormalVerbForm.negative,
        ])
      ).toEqual('食べられません');
    });
    it('passiveCausative', () => {
      expect(conjugate('食べる', [VerbForm.passiveCausative])).toEqual(
        '食べさせられる'
      );
    });
    it('passiveCausative -> negative', () => {
      expect(
        conjugate('食べる', [VerbForm.passiveCausative, VerbForm.negative])
      ).toEqual('食べさせられない');
    });
    it('passiveCausative -> formal', () => {
      expect(
        conjugate('食べる', [VerbForm.passiveCausative, VerbForm.formal])
      ).toEqual('食べさせられます');
    });
    it('passiveCausative -> formal -> negative', () => {
      expect(
        conjugate('食べる', [
          VerbForm.passiveCausative,
          VerbForm.formal,
          FormalVerbForm.negative,
        ])
      ).toEqual('食べさせられません');
    });
  });

  describe('有る', () => {
    it('ある - negative', () => {
      expect(conjugate('ある', [VerbForm.negative])).toEqual('ない');
    });
    describe('negative', () => {
      it('有る', () => {
        expect(conjugate('有る', [VerbForm.negative])).toEqual('ない');
      });
      it('在る', () => {
        expect(conjugate('在る', [VerbForm.negative])).toEqual('ない');
      });
    });
    describe('negative te', () => {
      it('ある', () => {
        expect(conjugate('ある', [VerbForm.negative, NaiForm.te])).toEqual(
          'なくて'
        );
      });
      it('有る', () => {
        expect(conjugate('有る', [VerbForm.negative, NaiForm.te])).toEqual(
          'なくて'
        );
      });
    });
    describe('keep ・', () => {
      describe('te', () => {
        it('あ・る', () => {
          expect(
            conjugate('あ・る', [VerbForm.te], true, WordType.v5r_i)
          ).toEqual('あ・って');
        });
        it('有・る', () => {
          expect(
            conjugate('有・る', [VerbForm.te], true, WordType.v5r_i)
          ).toEqual('有・って');
        });
      });
      describe('negative', () => {
        it('あ・る - negative', () => {
          expect(
            conjugate('あ・る', [VerbForm.negative], true, WordType.v5r_i)
          ).toEqual('ない');
        });
        it('有・る - negative', () => {
          expect(
            conjugate('有・る', [VerbForm.negative], true, WordType.v5r_i)
          ).toEqual('ない');
        });
      });
      describe('negative te', () => {
        it('あ・る', () => {
          expect(
            conjugate(
              'あ・る',
              [VerbForm.negative, VerbForm.te],
              true,
              WordType.v5r_i
            )
          ).toEqual('なくて');
        });
        it('有・る', () => {
          expect(
            conjugate(
              '有・る',
              [VerbForm.negative, VerbForm.te],
              true,
              WordType.v5r_i
            )
          ).toEqual('なくて');
        });
      });
    });
  });
  describe('為る', () => {
    it('為る - negative', () => {
      expect(conjugate('為る', [VerbForm.negative])).toEqual('為ない');
    });
    it('する - negative', () => {
      expect(conjugate('する', [VerbForm.negative])).toEqual('しない');
    });
  });
  describe('来る', () => {
    it('来る - negative', () => {
      expect(conjugate('来る', [VerbForm.negative])).toEqual('来ない');
    });
    it('くる - negative', () => {
      expect(conjugate('くる', [VerbForm.negative])).toEqual('こない');
    });
  });
  describe('良い', () => {
    describe('negative', () => {
      it('良い', () => {
        expect(conjugate('良い', [AdjectiveForm.negative])).toEqual('良くない');
      });
      it('いい', () => {
        expect(conjugate('いい', [AdjectiveForm.negative])).toEqual('よくない');
      });
    });
    describe('格好良い', () => {
      describe('negative', () => {
        it('格好良い', () => {
          expect(conjugate('格好良い', [AdjectiveForm.negative])).toEqual(
            '格好良くない'
          );
        });
        it('格好いい', () => {
          expect(conjugate('格好いい', [AdjectiveForm.negative])).toEqual(
            '格好よくない'
          );
        });
      });
    });
    describe('keep ・', () => {
      describe('negative', () => {
        it('良・い', () => {
          expect(
            conjugate('良・い', [AdjectiveForm.negative], true, WordType.adj_ix)
          ).toEqual('良・くない');
        });
        it('い・い', () => {
          expect(
            conjugate('い・い', [AdjectiveForm.negative], true, WordType.adj_ix)
          ).toEqual('よ・くない');
        });
      });
      describe('格好良・い', () => {
        describe('negative', () => {
          it('格好良・い', () => {
            expect(
              conjugate(
                '格好良・い',
                [AdjectiveForm.negative],
                true,
                WordType.adj_ix
              )
            ).toEqual('格好良・くない');
          });
          it('格好い・い', () => {
            expect(
              conjugate(
                '格好い・い',
                [AdjectiveForm.negative],
                true,
                WordType.adj_ix
              )
            ).toEqual('格好よ・くない');
          });
        });
      });
    });
  });
});
