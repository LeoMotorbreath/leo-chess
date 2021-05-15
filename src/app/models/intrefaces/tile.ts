import { AbstractFigure } from "./abstract-figure";
import { Position } from "./position";

export type TileHolder = AbstractFigure | null

export interface ITile {
  position: Position;
  holder: TileHolder;
  color: boolean;
  style: object;
  id: number;
}