import {Position} from './position';
import {AbstractFigure} from './abstract-figure';
import {HaveMoved} from "./haveMoved";

type TileHolder = AbstractFigure | HaveMoved | null

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
