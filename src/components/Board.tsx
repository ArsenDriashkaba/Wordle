import { FC } from "react";
import { WORD_LENGTH } from "../constants/shared";
import { TileRow, type TileRowProps } from "./TileRow";
import { GuessedChar, Word } from "../types/shared";

export type BoardProps = {
  currentGuess: Word;
  guesses: GuessedChar[][];
};

export const Board: FC<BoardProps> = ({ guesses, currentGuess }) => {
  const getTileRowProps = (rowIdx: number): TileRowProps => {
    const lastGuessId = guesses?.length || 0;
    const props: TileRowProps = { wordLength: WORD_LENGTH };

    if (rowIdx < lastGuessId) {
      return { ...props, currentGuess: guesses?.[rowIdx], isActive: true };
    }

    if (rowIdx === lastGuessId) {
      return { ...props, currentGuess, isActive: true };
    }

    return props;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 p-2 max-h-[60vh]">
      {[...Array(WORD_LENGTH + 1).keys()].map((index) => (
        <TileRow key={index} {...getTileRowProps(index)} />
      ))}
    </div>
  );
};
