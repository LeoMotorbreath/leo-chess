import {Position} from './position';
import {AbstractFigure} from './abstract-figure';
import {Movable} from "./movable";

type TileHolder = AbstractFigure | null

export interface ITile {
  position: Position;
  holder: TileHolder;
  color: boolean;
  style: object;
  id: number;
}

export class Tile implements ITile {
  static count = 0;
  id: number;
  color: false | true;
  position: Position;
  style: any = {};
  // holder: TileHolder;
  _holder: TileHolder;
  set holder(figure: AbstractFigure) {
    this._holder = figure;
    if (figure) figure.tile = this;
  }

  get holder() {
    return this._holder;
  }

  constructor(position, color) {
    this.position = position;
    this.color = color;
    this.id = ++Tile.count;
  }
}
