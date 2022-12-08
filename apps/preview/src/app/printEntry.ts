import { dictionary } from '@analyzer/lang/dictionary';

export function printEntry(entryId: string, latex = false) {
  const entry = dictionary.getEntry(entryId);
  if (entry === null) return entryId;

  const kanji = entry.kanjiElements?.[0]?.value;
  const kana = entry.readingElements?.[0]?.value;
  const label = `${kanji ? `${kanji}【${kana}】` : kana}`;

  const senses = entry.senses
    .map((sense) => sense.glosses.map((gloss) => gloss.value).join('; '))
    .join('; ');

  if (latex) {
    return `\\jp{${label}} [${entryId}] - \\textit{${senses.replace(
      /\^/g,
      '\\^'
    )}}`;
  } else {
    return `${label} [${entryId}] - ${senses}`;
  }
}
