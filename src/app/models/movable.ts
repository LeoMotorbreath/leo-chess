import {Position} from './position';
import {Board} from './board';
import {Tile} from './tile';

export class Movable {
  position: Position;
  board: Board;
  color: boolean;

  constructor(board: Board, position, color: boolean) {
    this.board = board;
    this.position = position;
    this.color = color;
  }

  move(position: Position): void {
    this.position = position;
  }

  protected check(row, y): Tile | null {
    const r = this.board.rows[row];
    if ((r && r[y])) {
      if (!r[y].holder || r[y].holder.color !== this.color) {
        return r[y];
      } else {
        return null;
      }
    }
  }

}
