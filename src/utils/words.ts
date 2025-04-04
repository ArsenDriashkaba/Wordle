import { Word } from "../types/shared";

export const getIsWordValid = (
  currentWord: Word,
  listOfValidWords: Word[]
): boolean => {
  const validLength = listOfValidWords?.[0].length;

  if (currentWord.length !== validLength) {
    return false;
  }

  return !!listOfValidWords.find(
    (word) => word.toUpperCase() === currentWord.toUpperCase()
  );
};

export const getIsKeyInputValid = (character: Word): boolean => {
  const isSingleCharacter = character.length === 1;
  const isAllowedCharacter = /^[a-zA-Z]$/.test(character);

  return isSingleCharacter && isAllowedCharacter;
};
