import { FC } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { GuessedChar } from "../../../types/shared";

const tileStyles = tv({
  base: "w-12 aspect-square font-bold bg-white border border-solid bg-transparent border-secondary-100 flex items-center justify-center text-xl",
  variants: {
    char: { true: "bg-secondary-100" },
    isActive: { false: "border-secondary-100/40" },
    isCorrect: { true: "bg-primary" },
    isOnCorrectPlace: { true: "bg-success" },
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
