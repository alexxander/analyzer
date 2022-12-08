import { generateAllForms, templates } from '@analyzer/lang/inflections';
import { segment, stopSegmentProcess } from '@analyzer/lang/analyzer';
import actualData from './segment-conjugation-data.json';

describe('segment-conjugation', () => {
  afterAll(stopSegmentProcess);
  it('segment-conjugation', async () => {
    expect.assertions(1);
    const data = [];
    for (const template of templates) {
      const forms = Object.entries(
        generateAllForms(template.example, template.type)
      );
      for (const [conjugation, conjugationForms] of forms) {
        for (const form of conjugationForms) {
          const res = await segment(form);
          data.push({
            type: template.type,
            word: template.example,
            conjugation,
            form,
            segmentation: res,
          });
        }
      }
    }

    expect(data).toEqual(actualData);
  }, 20000);
});
