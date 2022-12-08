import * as fs from 'fs';
import { JmdictParser, Jmdict } from '@analyzer/utils/jmdict';
import { assertDefined } from '@analyzer/utils/assert';

(async () => {
  const outputFilePath = assertDefined(
    process.env.DICT_JSON_PATH,
    'DICT_JSON_PATH is undefined'
  );

  const parser = new JmdictParser();
  const entries: Jmdict.WordEntry[] = [];
  await parser.parse(async (entry, error) => {
    if (error || !entry) return console.error(error);
    entries.push(entry);
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(entries));
  console.log('Done.');
})();
