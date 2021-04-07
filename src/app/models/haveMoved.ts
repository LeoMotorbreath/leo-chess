import {Movable} from './movable';
import {Board} from './board';
import {Position} from './position';
import {Tile} from './tile';



export class HaveMoved extends Movable {
  haveMoved = false;

  constructor(board: Board, pos: Position, color: boolean) {
    super(board, pos, color);
  }

  move(tile: Tile) {
    super.move(tile);
    this.haveMoved = true;
  }
}

