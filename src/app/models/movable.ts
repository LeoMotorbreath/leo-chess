import {Position} from './position';
import {Board} from './board';
import {Tile} from './tile';
import {AbstractFigure} from "./abstract-figure";

export class Movable {

  board: Board;
  color: boolean;
  tile: Tile;
  get position() {
    return this.tile.position
  };



  constructor(board: Board, tile: Tile, color: boolean) {
    this.board = board;
    this.tile = tile;
    this.color = color;
    this.tile.holder = (this as unknown as AbstractFigure);
  }

  move(tile: Tile): void {
    this.tile = tile;
  }

  protected check(row, y, protectionLeft?: boolean): Tile | null {
    const r = this.board.rows[row];
    if ((r && r[y])) {
      if (!r[y].holder || protectionLeft || r[y].holder.color !== this.color) {
        return r[y];
      } else {
        return null;
      }
    }
  }

}
