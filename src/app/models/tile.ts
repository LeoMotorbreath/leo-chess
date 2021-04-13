import {Position} from './position';
import {AbstractFigure} from './abstract-figure';

type TileHolder = AbstractFigure | null

export interface ITile {
  position: Position;
  holder: TileHolder;
  color: boolean;
  style: object;
}

export class Tile implements ITile{
  color: false | true;
  holder: TileHolder;
  position: Position;
  style: any = {};
  constructor(position, color) {
    this.position = position;
    this.color = color;
  }
}
