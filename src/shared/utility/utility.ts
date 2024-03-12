export const roundToPoint = (num: number, point: number): number => {
  const factor = Math.pow(10, point);
  return Math.round(num * factor) / factor;
};

export const getNow = (): string => {
  const now = new Date();
  return now.toISOString();
};
