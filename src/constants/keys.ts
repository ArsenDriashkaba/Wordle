export const KEYS = {
  BACKSPACE: "Backspace",
  ENTER: "Enter",
} as const;

export const KEYBOARD_ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [KEYS.ENTER, "Z", "X", "C", "V", "B", "N", "M", KEYS.BACKSPACE],
] as const;

export const KEYBOARD_GAP: number = 1; // tailwind spacing value
export const KEYBOARD_PADDING: number = 3; // tailwind spacing value
export const KEYBOARD_GAP_CLASS: string = `gap-${KEYBOARD_GAP}`;
export const KEYBOARD_PADDING_CLASS: string = `p-${KEYBOARD_PADDING}`;
