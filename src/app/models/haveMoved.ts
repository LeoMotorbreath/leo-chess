import {Movable} from './movable';
import {Board} from './board';
import {Position} from './position';
import {Tile} from './tile';



export class HaveMoved extends Movable {
  haventMoved = true;

  constructor(board: Board, pos: Position, color: boolean) {
    super(board, pos, color);
  }

  move(tile: Tile) {
    super.move(tile);
    this.haventMoved = false;
  }
}

