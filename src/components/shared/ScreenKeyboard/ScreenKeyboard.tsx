import { FC, useMemo } from "react";

import {
  KEYS,
  KEYBOARD_ROWS,
  KEYBOARD_GAP,
  KEYBOARD_PADDING,
} from "../../../constants/keys";
import { GuessedChar } from "../../../types/shared";
import { KeyboardKey, type KeyboardKeyProps } from "./KeyboardKey";
import { getEqualFlexRowItemWidthStyle } from "../../../utils/styles";
import { getMaxRowItemsCount } from "../../../utils/arrays";
import { tv } from "tailwind-variants";

const screenKeyboardStyles = tv({
  slots: {
    base: "flex flex-col items-center my-2",
    keyRow: "flex items-center justify-center w-full relative",
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
  const keyWidthStyle = getEqualFlexRowItemWidthStyle(maxKeyInRowCount, {
    gap: KEYBOARD_GAP,
    padding: KEYBOARD_PADDING,
  });

  return (
    <div
      className={base()}
      style={{ gap: KEYBOARD_GAP, padding: KEYBOARD_PADDING }}
    >
      {keyRows.map((row, rowIndex) => (
        <div
          key={`keyboard-row-${rowIndex}`}
          className={keyRow()}
          style={{ gap: KEYBOARD_GAP }}
        >
          {row.map(({ char, ...rest }) => (
            <KeyboardKey
              key={char}
              className={key({
                className: [
                  char === KEYS.BACKSPACE && "bg-primary px-2",
                  char === KEYS.ENTER && "bg-primary px-2",
                ],
              })}
              onClick={() => onKeyPress(char || "")}
              char={char === KEYS.BACKSPACE ? "⌫" : char}
              style={keyWidthStyle}
              {...rest}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
