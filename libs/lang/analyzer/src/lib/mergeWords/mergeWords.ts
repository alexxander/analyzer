import { BaseToken } from '@analyzer/lang/analyzer';
import { dictionary } from '@analyzer/lang/dictionary';
import { deconjugate, WordType } from '@analyzer/lang/inflections';
import { getCounter } from './counters';
import { WordToken, WordTokenType } from '../utils/tokens';

const MAX_CONJUGATION_SUFFIX_NGRAM_SIZE = 6; // Determined experimentally by segmenting all the possible conjugation suffixes supported by this system

const suffixFields = ['dict'] as const;
export function mergeWords(tokens: BaseToken[]): (WordToken | BaseToken)[] {
  const out: (WordToken | BaseToken)[] = [];
  for (
    let i = 0, wordLength, conjugationSuffixLength;
    i < tokens.length;
    i += wordLength + conjugationSuffixLength
  ) {
    wordLength = 1;
    conjugationSuffixLength = 0;

    const match: WordToken | null =
      matchNumeric(tokens, i) ?? matchWord(tokens, i);

    if (match === null) {
      out.push(tokens[i]);
    } else {
      out.push(match);
      wordLength = match.tokens.length;
      conjugationSuffixLength = match.conjugationTokens.length;
    }
  }

  return out;
}

function matchNumeric(tokens: BaseToken[], offset: number): WordToken | null {
  if (offset + 1 >= tokens.length) return null;

  const numToken = tokens[offset];
  const counterToken = tokens[offset + 1];
  const entryIds =
    getCounter(counterToken.surface) ??
    dictionary.get(counterToken.surface, WordType.ctr);

  if (numToken.norm.match(/^[0-9]+$/) && entryIds.size > 0) {
    return {
      type: WordTokenType.numeric,
      i: counterToken.i,
      surface: numToken.surface + counterToken.surface,
      norm: '', // TODO
      dict: numToken.dict + counterToken.dict,
      reading: (numToken.reading ?? '') + (counterToken.reading ?? ''),
      pos: counterToken.pos,
      tag: counterToken.tag,
      head: counterToken.head,
      dep: counterToken.dep,
      tokens: [numToken, counterToken],
      conjugationTokens: [],
      deconjugation: null,
      entryIds: Array.from(entryIds),
    };
  }

  return null;
}

function matchWord(tokens: BaseToken[], offset: number): WordToken | null {
  let match: WordToken | null = null;

  // Calculate the ngram size limit
  let ngramSizeLimit = 1;
  while (true) {
    if (offset + ngramSizeLimit >= tokens.length) break;
    const ngramTokens = tokens.slice(offset, offset + ngramSizeLimit + 1);
    const ngramPrefix = ngramTokens
      .slice(0, ngramTokens.length - 1)
      .map((ngramToken) => ngramToken.surface);
    const lastNgramToken = ngramTokens[ngramTokens.length - 1];

    if (
      suffixFields.every(
        (field) =>
          (ngramPrefix.length + lastNgramToken[field]).length >
          dictionary.getMaxWordLength()
      )
    )
      break;
    ngramSizeLimit++;
  }

  // Try to merge the word root tokens
  for (let ngramSize = ngramSizeLimit; ngramSize >= 1; ngramSize--) {
    const ngramTokens = tokens.slice(offset, offset + ngramSize);
    const root = getSubTreeRootToken(ngramTokens);
    if (root === null) continue;

    const ngramPrefix = ngramTokens
      .slice(0, ngramTokens.length - 1)
      .map((ngramToken) => ngramToken.surface);
    const lastNgramToken = ngramTokens[ngramTokens.length - 1];

    for (const field of suffixFields) {
      const ngramSuffix = lastNgramToken[field];
      const word = ngramPrefix + ngramSuffix;
      const entryIds = dictionary.get(word, root.tag.split('-')[0]);

      if (entryIds.size !== 0) {
        match = {
          type: WordTokenType.word,
          i: root.i,
          surface: ngramPrefix + lastNgramToken.surface,
          norm: '', // TODO
          dict: ngramPrefix + lastNgramToken.dict,
          reading: ngramTokens.map((ngramToken) => ngramToken.reading).join(''),
          pos: root.pos,
          tag: root.tag,
          head: root.head,
          dep: root.dep,
          tokens: ngramTokens,
          conjugationTokens: [],
          deconjugation: null,
          entryIds: Array.from(entryIds),
        };
        break;
      }
    }
    if (match) break;
  }

  // Try to merge the suffixes
  if (
    match &&
    new Set(['動詞', '形容詞', '助動詞']).has(match.tag.split('-')[0])
  ) {
    const wordLength = match.tokens.length;
    for (
      let ngramSize = Math.min(
        MAX_CONJUGATION_SUFFIX_NGRAM_SIZE,
        tokens.length - offset - wordLength
      );
      ngramSize >= 0;
      ngramSize--
    ) {
      const ngramTokens = tokens.slice(
        offset + wordLength,
        offset + wordLength + ngramSize
      );

      const word =
        match.surface +
        ngramTokens.map((ngramToken) => ngramToken.surface).join('');

      const deconjugation = deconjugate(word, match.dict);
      if (deconjugation.length > 0) {
        match.conjugationTokens = ngramTokens;
        match.deconjugation = deconjugation;
        match.surface = word;
        match.reading += ngramTokens
          .map((ngramToken) => ngramToken.reading)
          .join('');
        break;
      }
    }
  }
  return match;
}

function getSubTreeRootToken(tokens: BaseToken[]) {
  const ids = new Set(tokens.map((token) => token.i));

  let head: BaseToken | null = null;
  for (const token of tokens) {
    if (ids.has(token.head) && token.head !== token.i) continue;
    if (head !== null) {
      // The subtree has more than one root token
      return null;
    }
    head = token;
  }

  return head;
}
