import { FC } from "react";
import { GuessedChar } from "../store";
import { tv } from "tailwind-variants";

const tileStyles = tv({
  base: "w-10 aspect-square font-medium bg-white border border-solid border-black flex items-center justify-center",
  variants: {
    char: { true: "bg-gray-200" },
    isCorrect: { true: "bg-yellow-300" },
    isOnCorrectPlace: { true: "bg-green-300" },
  },
  defaultVariants: {},
});

export type TileProps = Partial<GuessedChar>;

export const Tile: FC<TileProps> = ({ char, isCorrect, isOnCorrectPlace }) => {
  return (
    <div className={tileStyles({ char: !!char, isCorrect, isOnCorrectPlace })}>
      {char || ""}
    </div>
  );
};
