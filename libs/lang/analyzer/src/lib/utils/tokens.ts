import { DeconjugationItem } from '@analyzer/lang/inflections';

export interface BaseToken {
  i: number;
  surface: string;
  norm: string;
  dict: string;
  reading: string | null;
  tag: string;
  pos: string;
  head: number;
  dep: string;
}

export enum WordTokenType {
  word = 'word',
  numeric = 'numeric',
}

export interface WordToken extends BaseToken {
  type: WordTokenType;
  tokens: BaseToken[];
  conjugationTokens: BaseToken[];
  deconjugation: DeconjugationItem[] | null;
  entryIds: string[];
}

export interface PhraseToken {
  name: string;
  tokens: (BaseToken | WordToken)[];
}

export type Token = BaseToken | WordToken | PhraseToken;

export function isWordToken(token: Token): token is WordToken {
  return 'entryIds' in token;
}

export function isPhraseToken(token: Token): token is PhraseToken {
  return 'name' in token;
}

export function isBaseToken(token: Token): token is BaseToken {
  return !isWordToken(token) && !isPhraseToken(token);
}
