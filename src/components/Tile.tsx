import { FC } from "react";
import { tv } from "tailwind-variants";

const tileStyles = tv({
  base: "font-medium bg-blue-500 text-white rounded-full active:opacity-80",
  variants: {
    state: {
      ordinary: "bg-blue-500 text-white",
      correct: "bg-purple-500 text-white",
      onTheRIghtSpot: "",
    },
  },
  defaultVariants: {
    state: "ordinary",
  },
});

export type TileProps = {
  isUsed?: boolean;
  letter?: string;
  isCorrect?: boolean;
  onTheRightPos?: boolean;
};

export const Tile: FC<TileProps> = ({
  isUsed,
  letter,
  isCorrect,
  onTheRightPos,
}) => {
  return <div className={tileStyles()}>{isUsed ? letter : ""}</div>;
};
