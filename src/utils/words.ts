export const getIsWordValid = (
  word: string,
  listOfValidWords: string[]
): boolean => {
  const validLength = listOfValidWords?.[0].length;

  if (word.length !== validLength) {
    return false;
  }

  return listOfValidWords.includes(word);
};
