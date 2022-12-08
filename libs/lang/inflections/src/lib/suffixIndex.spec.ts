import { suffixIndex } from './suffixIndex';
import actualData from './suffixIndex-data.json';

it('suffixIndex', () => {
  expect(suffixIndex).toEqual(actualData);
});
