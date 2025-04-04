import { FC } from "react";
import { GuessedChar } from "../store";
import { tv, VariantProps } from "tailwind-variants";

const tileStyles = tv({
  base: "w-10 aspect-square font-medium bg-white border border-solid border-black flex items-center justify-center",
  variants: {
    char: { true: "bg-gray-200" },
    isActive: { false: "border-gray-300" },
    isCorrect: { true: "bg-yellow-300" },
    isOnCorrectPlace: { true: "bg-green-300" },
    isLast: { true: "animate-bounce" },
  },
  defaultVariants: {},
});

type TileStylesProps = VariantProps<typeof tileStyles>;

export type TileProps = Partial<GuessedChar> &
  Pick<TileStylesProps, "isLast" | "isActive">;

export const Tile: FC<TileProps> = ({ char, ...rest }) => {
  return (
    <div
      className={tileStyles({
        char: !!char,
        ...rest,
      })}
    >
      {char || ""}
    </div>
  );
};
