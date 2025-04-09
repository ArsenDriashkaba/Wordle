import { FC } from "react";
import { Tile } from "./Tile";
import { GuessedChar, Word } from "../types/shared";

export type TileRowProps = {
  wordLength: number;
  currentGuess?: Word | GuessedChar[];
  isActive?: boolean;
};

export const TileRow: FC<TileRowProps> = ({
  wordLength,
  currentGuess,
  isActive,
}) => {
  const getCurrentGuessedChar = (index: number): Partial<GuessedChar> => {
    if (typeof currentGuess === "string") {
      return { char: currentGuess.charAt(index).toUpperCase() };
    }

    return currentGuess?.[index] || { char: "" };
  };

  return (
    <div className="flex gap-2 relative">
      {[...Array(wordLength).keys()].map((index) => (
        <Tile
          key={index}
          {...getCurrentGuessedChar(index)}
          isActive={isActive}
          isLast={index === currentGuess?.length}
        />
      ))}
    </div>
  );
};
