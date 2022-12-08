import {
  AdjectiveType,
  isAdjectiveType,
  isCopulaType,
  isVerbType,
  VerbType,
  WordType,
} from './wordType';

export type SimpleForm = string;
export type Form = SimpleForm | SimpleForm[] | null;

export interface BasicVerbTemplate {
  type: VerbType;
  example: string;
  nonPast: SimpleForm;
  masuStem: Form;
  naiStem: Form;
  imperative: Form;
  volitional: Form;
  te: Form;
}

export interface VerbTemplate extends BasicVerbTemplate {
  alt?: string[];
  negative: Form;
  formal: Form;
  cha: Form;
  ta: Form;
  passive: Form;
  causative: Form;
  passiveCausative: Form;
  potential: Form;
  conditional: Form;
}

export enum VerbForm {
  nonPast = 'nonPast',
  masuStem = 'masuStem',
  naiStem = 'naiStem',
  imperative = 'imperative',
  volitional = 'volitional',
  te = 'te',
  cha = 'cha',
  negative = 'negative',
  formal = 'formal',
  ta = 'ta',
  passive = 'passive',
  causative = 'causative',
  passiveCausative = 'passiveCausative',
  potential = 'potential',
  conditional = 'conditional',
}

export interface FormalVerbTemplate {
  nonPast: SimpleForm;
  te: SimpleForm;
  ta: SimpleForm;
  volitional: SimpleForm;
  conditional: SimpleForm;
  imperative: Form;

  negative: SimpleForm;
  pastNegative: SimpleForm;
}

export enum FormalVerbForm {
  nonPast = 'nonPast',
  te = 'te',
  ta = 'ta',
  volitional = 'volitional',
  conditional = 'conditional',
  imperative = 'imperative',

  negative = 'negative',
  pastNegative = 'pastNegative',
}

export interface NaiTemplate {
  nonPast: SimpleForm;
  te: SimpleForm;
  ta: SimpleForm;
  volitional: SimpleForm;
  conditional: SimpleForm;
  kya: SimpleForm;
  cha: SimpleForm;
}

export enum NaiForm {
  nonPast = 'nonPast',
  te = 'te',
  ta = 'ta',
  volitional = 'volitional',
  conditional = 'conditional',
  kya = 'kya',
  cha = 'cha',
}

export interface AdjectiveTemplate {
  type: AdjectiveType;
  example: string;
  alt?: string[];
  nonPast: SimpleForm;
  negative: Form;
  te: SimpleForm;
  ta: SimpleForm;
  cha: SimpleForm;
  conditional: Form;
  adverbial: SimpleForm;
  prenominal: Form;
  formal: SimpleForm;
  formalNegative: Form;
  formalPast: SimpleForm;
  formalPastNegative: Form;
}

export enum AdjectiveForm {
  nonPast = 'nonPast',
  negative = 'negative',
  te = 'te',
  ta = 'ta',
  cha = 'cha',
  conditional = 'conditional',
  adverbial = 'adverbial',
  prenominal = 'prenominal',
  formal = 'formal',
  formalNegative = 'formalNegative',
  formalPast = 'formalPast',
  formalPastNegative = 'formalPastNegative',
}

export interface CopulaTemplate
  extends Omit<AdjectiveTemplate, 'adverbial' | 'cha' | 'type' | 'alt'> {
  type: WordType.cop;
}

export enum CopulaForm {
  nonPast = 'nonPast',
  negative = 'negative',
  te = 'te',
  ta = 'ta',
  conditional = 'conditional',
  prenominal = 'prenominal',
  formal = 'formal',
  formalNegative = 'formalNegative',
  formalPast = 'formalPast',
  formalPastNegative = 'formalPastNegative',
}

export type Template = VerbTemplate | AdjectiveTemplate | CopulaTemplate;
export type FormName =
  | VerbForm
  | AdjectiveForm
  | CopulaForm
  | FormalVerbForm
  | NaiForm;

export function isVerbTemplate(template: Template): template is VerbTemplate {
  return isVerbType(template.type);
}

export function isAdjectiveTemplate(
  template: Template
): template is AdjectiveTemplate {
  return isAdjectiveType(template.type);
}

export function isCopulaTemplate(
  template: Template
): template is CopulaTemplate {
  return isCopulaType(template.type);
}
