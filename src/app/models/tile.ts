import {Position} from './position';
import {AbstractFigure} from './abstract-figure';

export interface ITile {
  position: Position;
  holder: AbstractFigure | null;
  color: boolean;
  style: object;
}

export class Tile implements ITile {
  color: false | true;
  holder: AbstractFigure | null;
  position: Position;
  style: any = {};
  constructor(position, color) {
    this.position = position;
    this.color = color;
  }
}
