import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {Tile} from '../tile';
import {Movable} from '../movable';
import { IHaveMoved } from '../haveMoved';
import {Queen} from "./queen";

export class Pawn extends Movable implements AbstractFigure, IHaveMoved {
  image: string;
  haventMoved = true;
  private readonly lastTileIndex: number;
  private readonly direction: 1 | -1;
  constructor(pos: Position, color: boolean, board) {
    super(board, pos, color);
    this.image = color ? Guris.svgw + Guris.pawn : Guris.svgb + Guris.pawn;
    this.direction = color ? 1 : -1
    this.lastTileIndex = color ? 7 : 0;
  }

  findPseudoLegalMoves(): Tile[] {
    const nextRow = this.getNextRow();
    const basic = [
      this.check(nextRow, this.position.y - 1),
      this.checkStr(nextRow, this.position.y),
      this.check(nextRow, this.position.y + 1)
    ];
    if (this.haventMoved) {
      basic.push(this.checkStr(nextRow + this.direction, this.position.y));
    }
    if (this.board.elPasantCheck) {
      basic.push(this.getElPasantMove())
    }
    return basic.filter(el => !!el);
  }

  move(tile: Tile) {
    super.move(tile);
    this.haventMoved = false;
    if (tile.position.row === this.lastTileIndex) {
      this.board.removeFigure(this)
      this.board.getTileByPosition(this.position).holder = new Queen(this.position, this.color, this.board);
      return;
    }
    if(this.board.elPasantCheck) {
      let pos = {row: this.position.row - this.direction, y: this.position.y};
      if (this.board.posEqual(pos,  (this.board.elPasantCheck as any).elPasantPosition)) {
        this.board.removeFigure(this.board.getTileByPosition(pos).holder)
      }
    }

    return {
      elPasantCheck: true,
      elPasantPosition: this.position,
    };
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

  private getElPasantMove(): Tile | null {
    const r = this.position.row
    const nr = this.getNextRow();
    if(this.board.posEqual({row: r, y: this.position.y - 1}, (this.board.elPasantCheck as any).elPasantPosition)){
      return this.board.getTileByPosition({row: nr, y: this.position.y - 1});
    }
    if(this.board.posEqual({row: r, y: this.position.y + 1}, (this.board.elPasantCheck as any).elPasantPosition)){
      return this.board.getTileByPosition({row: nr, y: this.position.y + 1})
    }
  }

  private getNextRow(): number {
    return this.position.row + this.direction;
  }
}
