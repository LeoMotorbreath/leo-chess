import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {Tile} from '../tile';
import {Movable} from '../movable';
import { IHaveMoved } from '../haveMoved';

export class Pawn extends Movable implements AbstractFigure, IHaveMoved {
  image: string;
  haventMoved = true;
  private readonly direction: 1 | -1;
  constructor(pos: Position, color: boolean, board) {
    super(board, pos, color);
    this.image = color ? Guris.svgw + Guris.pawn : Guris.svgb + Guris.pawn;
    this.direction = color ? 1 : -1;
  }

  findPseudoLegalMoves(): Tile[] {
    const nextRow = this.position.row + this.direction;
    const basic =  [
      this.check(nextRow, this.position.y - 1),
      this.checkStr(nextRow, this.position.y),
      this.check(nextRow, this.position.y + 1)
    ];
    if (this.haventMoved) {
      basic.push(this.checkStr(nextRow + this.direction, this.position.y));
    }
    return basic.filter(el => !!el);
  }

  move(tile: Tile) {
    super.move(tile);
    this.haventMoved = false;
  }

  check(row, y): Tile | null {
    const r = this.board.rows[row];
    if (r && r[y]) {
      if (r[y].holder && r[y].holder.color !== this.color) {
        return r[y];
      } else {
        return null;
      }
    }
  }

  private checkStr(row, y): Tile | null {
    const r = this.board.rows[row];
    if (r && r[y]) {
      return !r[y].holder ? r[y] : null;
    }
  }
}
