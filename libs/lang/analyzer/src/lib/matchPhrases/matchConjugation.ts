import { FormName } from '@analyzer/lang/inflections';
import { ConjugationPattern } from './patternTypes';

export function matchConjugation(
  conjugation: FormName[],
  pattern: ConjugationPattern
) {
  if ('startsWith' in pattern) {
    return startsWith(conjugation, pattern.startsWith);
  } else if ('endsWith' in pattern) {
    return endsWith(conjugation, pattern.endsWith);
  } else if ('contains' in pattern) {
    return contains(conjugation, pattern.contains);
  } else if ('matches' in pattern) {
    return matches(conjugation, pattern.matches);
  }
}

function matches(a: any[], b: any[]) {
  return a.length === b.length && a.every((item, i) => item === b[i]);
}

function contains(arr: any[], contains: any[]) {
  for (let i = 0; i < arr.length - contains.length + 1; i++) {
    if (contains.every((item, j) => arr[i + j] === item)) return true;
  }
  return false;
}

function startsWith(arr: any[], start: any[]) {
  return (
    arr.length >= start.length && start.every((item, i) => item === arr[i])
  );
}

function endsWith(arr: any[], end: any[]) {
  return (
    arr.length >= end.length &&
    end.every((item, i) => item === arr[arr.length - end.length + i])
  );
}
