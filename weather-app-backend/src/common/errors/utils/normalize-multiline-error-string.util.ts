export const normalizeMultilineErrorString = (str: string) =>
  str
    .split('\n')
    .map((line: string) => line.trim())
    .filter(Boolean);
