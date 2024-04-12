export const fromValueToKey = <O extends Record<string, number | string>, K extends keyof O, V extends O[K]>(
  obj: O,
  value: V,
): K => {
  const key = Object.keys(obj).find((key: string) => obj[key] === value);
  if (!key) throw new Error('Invalid category');
  return key as K;
};

export const fromKeyToValue = <O extends Record<string, number | string>, K extends keyof O, V extends O[K]>(
  obj: O,
  key: K,
): V => {
  const value = Object.values(obj).find((value) => value === obj[key as string]);
  if (!value) throw new Error('Invalid category');
  return value as V;
};
