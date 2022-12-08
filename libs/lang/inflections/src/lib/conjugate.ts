import {
  Form,
  FormalVerbTemplate,
  FormName,
  NaiTemplate,
  Template,
  VerbTemplate,
} from './templateTypes';
import { guessWordType } from './getWordType/guessWordType';
import { isVerbType, WordType } from './wordType';
import { formalVerbTemplate, naiTemplate, templatesDict } from './templates';
import { modifyForm } from './formHelpers';
import { getWordType } from './getWordType/getWordType';

enum InterWordType {
  masu = 'masu',
  nai = 'nai',
}

export function conjugate(
  word: string,
  targetForm: FormName[],
  firstConjugation = true,
  wordType: WordType | InterWordType = getWordType(word)
) {
  const items = [];
  for (const item of generateConjugations(word, wordType, targetForm)) {
    if (firstConjugation) return item;
    items.push(item);
  }
  return items;
}

export function* generateConjugations(
  word: string,
  type: WordType | InterWordType,
  targetForm: FormName[]
): IterableIterator<string> {
  const [formStep, ...nextFormSteps] = targetForm;

  const forms =
    type === InterWordType.nai
      ? naiTemplate
      : type === InterWordType.masu
      ? formalVerbTemplate
      : templatesDict[type];
  if (forms === undefined)
    throw new Error(`Cannot find the template for type "${type}"`);
  const [from, to] = getFromTo(word, forms, formStep);
  if (to === null || to === undefined)
    throw new Error(
      `Cannot find the target form "${formStep}" on type "${type}"`
    );

  let counter = 0;
  for (const result of formGenerator(
    modifyForm(to, (item) => word.replace(new RegExp(`${from}$`), item))
  )) {
    let resultType;
    if (isVerbType(type as any) && formStep === 'formal') {
      resultType = InterWordType.masu;
    } else if (formStep === 'negative') {
      resultType = InterWordType.nai;
    } else {
      resultType = guessWordType(result);
    }

    if (nextFormSteps.length === 0) yield result;
    else yield* generateConjugations(result, resultType, nextFormSteps);
    counter++;
  }

  if (counter === 0) {
    throw new Error('generateConjugations: no forms generated');
  }
}

function getFromTo(
  word: string,
  forms: NaiTemplate | FormalVerbTemplate | Template,
  formName: FormName
): [string, Form] {
  const wordContainsSeparator = word.indexOf('・') !== -1;
  const rawFrom = [forms.nonPast, ...((forms as VerbTemplate).alt ?? [])].find(
    (item) =>
      wordContainsSeparator
        ? word.endsWith(item)
        : word.endsWith(item.replace('・', ''))
  ); // e.g. 為・る or す・る
  const isRawFromAlt = forms.nonPast !== rawFrom;

  if (rawFrom === undefined)
    throw new Error('Cannot match the word suffix with the template');

  const from = wordContainsSeparator ? rawFrom : rawFrom.replace('・', '');
  const root = isRawFromAlt ? rawFrom.split('・')[0] : '$1';

  return [
    from,
    modifyForm(forms[formName as keyof typeof forms], (item) => {
      return item.replace(
        /^(.*)・/,
        root + (wordContainsSeparator ? '・' : '')
      );
    }),
  ];
}

function* formGenerator(form: Form): IterableIterator<string> {
  if (form === null) return;
  if (Array.isArray(form)) yield* form;
  else yield form;
}
