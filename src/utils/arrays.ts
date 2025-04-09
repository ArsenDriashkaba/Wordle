export const getRandomItem = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const getMaxRowItemsCount = <T>(array: T[][]): number =>
  Math.max(0, ...array.map((row) => row.length));
