export const KEYS = {
  BACKSPACE: "Backspace",
  ENTER: "Enter",
} as const;

export const KEYBOARD_ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [KEYS.ENTER, "Z", "X", "C", "V", "B", "N", "M", KEYS.BACKSPACE],
] as const;

export const KEYBOARD_GAP: string = "0.25rem";
export const KEYBOARD_PADDING: string = "1.5rem";
