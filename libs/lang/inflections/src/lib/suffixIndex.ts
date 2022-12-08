import { templates } from './templates';
import { generateAllForms } from './generateAllForms';
import { FormName, isAdjectiveTemplate, isVerbTemplate } from './templateTypes';
import { WordType } from './wordType';

type SuffixIndexValue = {
  type: WordType;
  conjugation: FormName[];
  suffix: string;
};

type SuffixIndex = Record<
  string, // conjugation suffix without the root separator
  SuffixIndexValue[]
>;

function generateSuffixIndex(): SuffixIndex {
  const out: SuffixIndex = {};
  for (const template of templates) {
    const nonPastValues = [
      template.nonPast,
      ...(isAdjectiveTemplate(template) || isVerbTemplate(template)
        ? template.alt ?? []
        : []),
    ];
    for (const nonPast of nonPastValues) {
      for (const [conjugation, suffixes] of Object.entries(
        generateAllForms(nonPast, template.type)
      )) {
        for (const suffix of suffixes) {
          const key = suffix.replace('・', '');
          out[key] ??= [];
          out[key].push({
            suffix,
            type: template.type,
            conjugation: conjugation.split('.') as FormName[],
          });
        }
      }
    }
  }

  return out;
}

export const suffixIndex = generateSuffixIndex();
