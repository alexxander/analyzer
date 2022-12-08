const counters: Record<string, string> = {
  円: '1175570',
  月: '1255430',
  年: '2084840',
  時: '2020680',
  分: '1502840',
  秒: '1490430',
};

export function getCounter(counter: string) {
  return counters[counter] !== undefined
    ? new Set([counters[counter]])
    : undefined;
}
