import { FC } from "react";
import { Tile } from "./Tile";

export type TileRowProps = {
  wordLength: number;
};

export const TileRow: FC<any> = ({ wordLength }) => {
  return (
    <div>
      {[...Array(wordLength).keys()].map((index) => (
        <Tile key={index} />
      ))}
    </div>
  );
};
