import { generateConjugations } from './conjugate';
import {
  AdjectiveForm,
  CopulaForm,
  FormalVerbForm,
  FormName,
  NaiForm,
  VerbForm,
} from './templateTypes';
import { isAdjectiveType, isCopulaType, isVerbType } from './wordType';
import { getWordType } from './getWordType/getWordType';

const simpleVerbForms: FormName[][] = [
  [VerbForm.nonPast],
  [VerbForm.imperative],
  [VerbForm.volitional],
  [VerbForm.te],
  [VerbForm.ta],
  [VerbForm.cha],

  [VerbForm.conditional],

  [VerbForm.naiStem],
  [VerbForm.negative],
  [VerbForm.negative, NaiForm.te],
  [VerbForm.negative, NaiForm.ta],
  [VerbForm.negative, NaiForm.cha],
  [VerbForm.negative, NaiForm.volitional],
  [VerbForm.negative, NaiForm.conditional],
  [VerbForm.negative, NaiForm.kya],

  [VerbForm.masuStem],
  [VerbForm.formal],
  [VerbForm.formal, FormalVerbForm.te],
  [VerbForm.formal, FormalVerbForm.ta],
  [VerbForm.formal, FormalVerbForm.volitional],
  [VerbForm.formal, FormalVerbForm.conditional],
  [VerbForm.formal, FormalVerbForm.imperative],
  [VerbForm.formal, FormalVerbForm.negative],
  [VerbForm.formal, FormalVerbForm.pastNegative],
];

const complexVerbForms: FormName[] = [
  VerbForm.passive,
  VerbForm.causative,
  VerbForm.passiveCausative,
  VerbForm.potential,
];

const adjectiveForms: FormName[][] = [
  [AdjectiveForm.nonPast],
  [AdjectiveForm.negative],
  [AdjectiveForm.negative, NaiForm.te],
  [AdjectiveForm.negative, NaiForm.ta],
  [AdjectiveForm.negative, NaiForm.cha],
  [AdjectiveForm.negative, NaiForm.volitional],
  [AdjectiveForm.negative, NaiForm.conditional],
  [AdjectiveForm.negative, NaiForm.kya],
  [AdjectiveForm.te],
  [AdjectiveForm.ta],
  [AdjectiveForm.cha],
  [AdjectiveForm.conditional],
  [AdjectiveForm.adverbial],
  [AdjectiveForm.prenominal],
  [AdjectiveForm.formal],
  [AdjectiveForm.formalNegative],
  [AdjectiveForm.formalPast],
  [AdjectiveForm.formalPastNegative],
];

const copulaForms: FormName[][] = [
  [CopulaForm.nonPast],
  [CopulaForm.negative],
  [CopulaForm.negative, NaiForm.te],
  [CopulaForm.negative, NaiForm.ta],
  [CopulaForm.negative, NaiForm.cha],
  [CopulaForm.negative, NaiForm.volitional],
  [CopulaForm.negative, NaiForm.conditional],
  [CopulaForm.negative, NaiForm.kya],
  [CopulaForm.te],
  [CopulaForm.ta],
  [CopulaForm.conditional],
  [CopulaForm.prenominal],
  [CopulaForm.formal],
  [CopulaForm.formalNegative],
  [CopulaForm.formalPast],
  [CopulaForm.formalPastNegative],
];

export function generateAllForms(word: string, type = getWordType(word)) {
  const out: Record<string, string[]> = {};
  if (isVerbType(type)) {
    for (const form of simpleVerbForms) {
      out[form.join('.')] = Array.from(generateConjugations(word, type, form));
    }

    for (const part of complexVerbForms) {
      for (const simpleForm of simpleVerbForms) {
        const form = [part, ...simpleForm];
        out[form.join('.')] = Array.from(
          generateConjugations(word, type, form)
        );
      }
    }
  } else if (isAdjectiveType(type) || isCopulaType(type)) {
    for (const form of isCopulaType(type) ? copulaForms : adjectiveForms) {
      out[form.join('.')] = Array.from(generateConjugations(word, type, form));
    }
  }

  return out;
}
