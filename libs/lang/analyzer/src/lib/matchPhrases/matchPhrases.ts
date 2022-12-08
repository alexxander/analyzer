import {
  BaseToken,
  isWordToken,
  PhraseToken,
  WordToken,
} from '../utils/tokens';
import { patterns } from './patterns';
import { matchConjugation } from './matchConjugation';
import {
  isPatternBranchingOptional,
  isPatternBranchingOr,
  isSimplePos,
  PatternItem,
  PatternToken,
} from './patternTypes';

export function matchPhrases(
  tokens: (BaseToken | WordToken)[]
): (WordToken | BaseToken | PhraseToken)[] {
  const out: (WordToken | BaseToken | PhraseToken)[] = [];
  for (let i = 0, len; i < tokens.length; i += len) {
    len = 1;
    let match: PhraseToken | null = null;
    for (const pattern of patterns) {
      const matchedTokens = matchPatternItems(tokens, i, pattern.value);

      if (matchedTokens) {
        len = matchedTokens.length;
        match = {
          name: pattern.name,
          tokens: matchedTokens,
        };
        break;
      }
    }
    out.push(match ?? tokens[i]);
  }
  return out;
}

function matchPatternItems(
  tokens: (BaseToken | WordToken)[],
  offset: number,
  patternItems: PatternItem[]
): (BaseToken | WordToken)[] | null {
  const out: (BaseToken | WordToken)[] = [];
  let tokenPointer = 0;
  for (const patternItem of patternItems) {
    if (isPatternBranchingOptional(patternItem)) {
      const match = matchPatternItems(
        tokens,
        offset + tokenPointer,
        patternItem.optional
      );
      if (match === null) continue;
      out.push(...match);
      tokenPointer += match.length;
    } else if (isPatternBranchingOr(patternItem)) {
      let match = null;
      for (const sub of patternItem.or) {
        match = matchPatternItems(tokens, offset + tokenPointer, sub);
        if (match !== null) {
          break;
        }
      }
      if (match === null) return null;
      out.push(...match);
      tokenPointer += match.length;
    } else {
      if (
        offset + tokenPointer < tokens.length &&
        matchToken(tokens[offset + tokenPointer], patternItem)
      ) {
        out.push(tokens[offset + tokenPointer]);
        tokenPointer++;
      } else return null;
    }
  }
  return out;
}

function matchToken(token: BaseToken | WordToken, patternToken: PatternToken) {
  if (typeof patternToken === 'string') {
    return token.surface === patternToken;
  }

  if (!isWordToken(token)) return false;

  // Match type
  if (patternToken.type !== undefined && token.type !== patternToken.type) {
    return false;
  }

  // Match base token
  if (
    patternToken.token !== undefined &&
    !patternToken.token.every(
      ([i, item]) => i in token.tokens && matchToken(token.tokens[i], item)
    )
  ) {
    return false;
  }

  // Match dict
  if (patternToken.dict !== undefined && token.dict !== patternToken.dict) {
    return false;
  }

  // Match pos
  if (patternToken.pos !== undefined) {
    const tokenPos = token.deconjugation
      ? token.deconjugation.map((item) => item.type)
      : []; // TODO Deal with the words that do not have the deconjugation block

    if (isSimplePos(patternToken.pos)) {
      if (!tokenPos.some((pos) => pos.startsWith(patternToken.pos!))) {
        return false;
      }
    } else {
      if (!tokenPos.some((pos) => pos === patternToken.pos!)) {
        return false;
      }
    }
  }

  // Match conjugation
  if (patternToken.conjugation !== undefined) {
    if (!token.deconjugation) return false;
    if (
      !token.deconjugation.some((item) =>
        matchConjugation(item.conjugation, patternToken.conjugation!)
      )
    ) {
      return false;
    }
  }

  return true;
}
