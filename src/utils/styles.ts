export type Spacings = {
  padding?: number;
  gap?: number;
};

export const getEvenItemWidthPerFlexRow = (
  maxRowItemsCount: number,
  { padding, gap }: Spacings
): string => {
  const paddingCalcString: string = padding ? `-(--spacing(${padding}))*2` : "";
  const gapCalcString: string = gap
    ? `-(--spacing(${gap}))*${maxRowItemsCount - 1}`
    : "";

  return `w-[calc((100%${paddingCalcString}${gapCalcString})/${maxRowItemsCount})]`;
};
