import { FC, useMemo } from "react";

import {
  KEYS,
  KEYBOARD_ROWS,
  KEYBOARD_GAP,
  KEYBOARD_GAP_CLASS,
  KEYBOARD_PADDING,
  KEYBOARD_PADDING_CLASS,
} from "../constants/keys";
import { GuessedChar } from "../types/shared";
import { KeyboardKey, type KeyboardKeyProps } from "./KeyboardKey";
import { getEvenItemWidthPerFlexRow } from "../utils/styles";
import { getMaxRowItemsCount } from "../utils/arrays";
import { tv } from "tailwind-variants";

const screenKeyboardStyles = tv({
  slots: {
    base: [
      "flex flex-col items-center my-2",
      KEYBOARD_GAP_CLASS,
      KEYBOARD_PADDING_CLASS,
    ],
    keyRow: [
      "flex items-center justify-center w-full relative",
      KEYBOARD_GAP_CLASS,
    ],
    key: ["py-2 font-medium", "sm:py-3 sm:font-large"],
  },
});

export type ScreenKeyboardProps = {
  usedCharacters: GuessedChar[];
  onKeyPress: (key: string) => void;
  className?: string;
};

export const ScreenKeyboard: FC<ScreenKeyboardProps> = ({
  onKeyPress,
  usedCharacters,
}) => {
  const maxKeyInRowCount = useMemo<number>(
    () => getMaxRowItemsCount(KEYBOARD_ROWS),
    [KEYBOARD_ROWS]
  );
  const keyRows = useMemo<KeyboardKeyProps[][]>(
    () =>
      KEYBOARD_ROWS.map((keyRow) =>
        keyRow.map((key) => {
          const usedKeyCharacter = usedCharacters.find(
            (usedChar) => usedChar.char === key
          );

          return usedKeyCharacter
            ? { ...usedKeyCharacter, isUsed: true }
            : { char: key };
        })
      ),
    [usedCharacters]
  );

  const { base, keyRow, key } = screenKeyboardStyles();
  const keyWidthClass = getEvenItemWidthPerFlexRow(maxKeyInRowCount, {
    gap: KEYBOARD_GAP,
    padding: KEYBOARD_PADDING,
  });

  console.log({ usedCharacters });

  return (
    <div className={base()}>
      {keyRows.map((row, rowIndex) => (
        <div key={`keyboard-row-${rowIndex}`} className={keyRow()}>
          {row.map(({ char, ...rest }) => (
            <KeyboardKey
              key={char}
              className={key({
                className: [
                  keyWidthClass,
                  char === KEYS.BACKSPACE && "bg-primary px-2",
                  char === KEYS.ENTER && "bg-primary px-2",
                ],
              })}
              onClick={() => onKeyPress(char || "")}
              char={char === KEYS.BACKSPACE ? "⌫" : char}
              {...rest}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
