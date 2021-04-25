import {Position} from './position';
import {AbstractFigure} from './abstract-figure';

type TileHolder = AbstractFigure | null

export interface ITile {
  position: Position;
  holder: TileHolder;
  color: boolean;
  style: object;
  id: number
}

export class Tile implements ITile {
  static count = 0;
  id: number;
  color: false | true;
  holder: TileHolder;
  position: Position;
  style: any = {};

  constructor(position, color) {
    this.position = position;
    this.color = color;
    this.id = ++Tile.count
  }
}
