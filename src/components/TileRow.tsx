import { FC } from "react";
import { Tile } from "./Tile";
import { GuessedChar } from "../store";
import { Word } from "../types/shared";

export type TileRowProps = {
  wordLength: number;
  currentGuess?: Word | GuessedChar[];
};

export const TileRow: FC<TileRowProps> = ({ wordLength, currentGuess }) => {
  const getCurrentGuessedChar = (index: number): Partial<GuessedChar> => {
    if (typeof currentGuess === "string") {
      return { char: currentGuess.charAt(index).toUpperCase() };
    }

    return currentGuess?.[index] || { char: "" };
  };

  return (
    <div className="flex gap-2">
      {[...Array(wordLength).keys()].map((index) => (
        <Tile key={index} {...getCurrentGuessedChar(index)} />
      ))}
    </div>
  );
};
