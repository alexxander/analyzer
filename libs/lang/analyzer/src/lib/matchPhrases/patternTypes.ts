import { FormName, WordType } from '@analyzer/lang/inflections';
import { WordTokenType } from '../utils/tokens';

export enum SimplePOS {
  v = 'v',
  n = 'n',
  adj = 'adj',
}

type PatternPos = SimplePOS | WordType;

export function isSimplePos(pos: PatternPos): pos is SimplePOS {
  switch (pos as SimplePOS) {
    case SimplePOS.v:
    case SimplePOS.n:
    case SimplePOS.adj:
      return true;
    default:
      return false;
  }
}

export type ConjugationPattern =
  | { startsWith: FormName[] }
  | { endsWith: FormName[] }
  | { contains: FormName[] }
  | { matches: FormName[] };
export type PatternToken =
  | string
  | {
      dict?: string;
      pos?: PatternPos;
      conjugation?: ConjugationPattern;
      type?: WordTokenType;
      token?: [number, PatternToken][];
    };
export type PatternBranchingOr = { or: PatternItem[][] };
export type PatternBranchingOptional = { optional: PatternItem[] };
export type PatternItem =
  | PatternToken
  | PatternBranchingOr
  | PatternBranchingOptional;

export function isPatternBranchingOr(
  item: PatternItem
): item is PatternBranchingOr {
  return typeof item !== 'string' && 'or' in item;
}
export function isPatternBranchingOptional(
  item: PatternItem
): item is PatternBranchingOptional {
  return typeof item !== 'string' && 'optional' in item;
}

export interface Pattern {
  name: string;
  value: PatternItem[];
}
