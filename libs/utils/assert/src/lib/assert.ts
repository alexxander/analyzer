export function assertDefined<T>(
  val: T,
  message: string
): Exclude<T, undefined> {
  if (val === undefined) throw new Error(`assertDefined: ${message}`);
  return val as any;
}

export function assertNotNull<T>(val: T, message: string): Exclude<T, null> {
  if (val === null) throw new Error(`assertNotNull: ${message}`);
  return val as any;
}

export function assertValue<T>(
  val: T,
  message: string
): Exclude<T, null | undefined> {
  if (val === null) throw new Error(`assertValue: ${message}`);
  return val as any;
}
