import { BasicVerbTemplate, Form, VerbTemplate } from './templateTypes';

export function modifyForm(form: Form, update: (item: string) => Form): Form {
  if (form === null) return null;
  if (Array.isArray(form))
    return form
      .map(update)
      .filter((item): item is Exclude<Form, null> => item !== null)
      .flat();
  return update(form);
}

export function extendBasicTemplate(
  basicForms: BasicVerbTemplate,
  ichidan = false
): VerbTemplate {
  const causative = modifyForm(basicForms.naiStem, (item) =>
    ichidan ? [item + 'させる', item + 'さす'] : [item + 'せる', item + 'す']
  );

  return {
    ...basicForms,
    negative: modifyForm(basicForms.naiStem, (item) => item + 'ない'),
    ta: modifyForm(basicForms.te, (item) =>
      item.replace(/て$/, 'た').replace(/で$/, 'だ')
    ),
    cha: modifyForm(basicForms.te, (item) =>
      item.replace(/て$/, 'ちゃ').replace(/で$/, 'じゃ')
    ),
    passive: modifyForm(
      basicForms.naiStem,
      (item) => item + (ichidan ? 'られる' : 'れる')
    ),
    causative,
    passiveCausative: modifyForm(basicForms.naiStem, (item) =>
      ichidan
        ? item + 'させられる'
        : basicForms.nonPast.endsWith('す')
        ? item + 'せられる'
        : [item + 'せられる', item + 'される']
    ),
    potential: ichidan
      ? modifyForm(basicForms.masuStem, (item) => [
          item + 'られる',
          item + 'れる',
        ])
      : modifyForm(basicForms.imperative, (item) => item + 'る'),
    conditional: ichidan
      ? modifyForm(basicForms.masuStem, (item) => item + 'れば')
      : modifyForm(basicForms.imperative, (item) => item + 'ば'),
    formal: modifyForm(basicForms.masuStem, (item) => item + 'ます'),
  };
}
