import { CSSProperties } from "react";

export type Spacings = Pick<CSSProperties, "gap" | "padding">;

export const getEqualFlexRowItemWidthStyle = (
  maxRowItemsCount: number,
  { padding, gap }: Spacings
): CSSProperties => {
  const paddingCalcString: string = padding ? `- ${padding} * 2` : "";
  const gapCalcString: string = gap ? `- ${gap} * ${maxRowItemsCount - 1}` : "";

  return {
    width: `calc((100% ${paddingCalcString} ${gapCalcString}) / ${maxRowItemsCount})`,
  };
};
