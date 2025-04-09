import { FC } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { GuessedChar } from "../types/shared";
import { Button, ButtonProps } from "./Button";

const keyboardKeyStyles = tv({
  base: ["min-w-fit p-1 bg-white"],
  variants: {
    char: { true: ["bg-gray-200", "active:bg-white"] },
    isUsed: {
      true: [
        "animate-flip-horizontal bg-secondary-500 text-secondary-100",
        "active:bg-secondary-100",
      ],
    },
    isCorrect: { true: ["bg-primary text-black", "active:bg-yellow-100"] },
    isOnCorrectPlace: {
      true: ["bg-success text-black", "active:bg-green-100"],
    },
  },
});

export type KeyboardKeyProps = Partial<GuessedChar> &
  Omit<VariantProps<typeof keyboardKeyStyles>, "char"> &
  Omit<ButtonProps, "type" | "variant" | "size">;

export const KeyboardKey: FC<KeyboardKeyProps> = ({
  char,
  isUsed,
  isCorrect,
  isOnCorrectPlace,
  className,
  ...rest
}) => {
  return (
    <Button
      className={keyboardKeyStyles({
        char: !!char,
        isUsed,
        isCorrect,
        isOnCorrectPlace,
        className,
      })}
      size="keyboard"
      {...rest}
    >
      {char || ""}
    </Button>
  );
};
