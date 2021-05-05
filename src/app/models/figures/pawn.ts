import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {Tile} from '../tile';
import {Movable} from '../movable';
import {IHaveMoved} from '../haveMoved';
import {Queen} from "./queen";

export class Pawn extends Movable implements AbstractFigure, IHaveMoved {
  image: string;
  haventMoved = true;
  private readonly lastTileIndex: number;
  private readonly direction: 1 | -1;

  constructor(tile: Tile, color: boolean, board) {
    super(board, tile, color);
    this.image = color ? Guris.svgw + Guris.pawn : Guris.svgb + Guris.pawn;
    this.direction = color ? 1 : -1;
    this.lastTileIndex = color ? 7 : 0;
  }

  findPseudoLegalMoves(): Tile[] {
    const basic = this.getBasicMoves( false);
    if (this.board.elPasantMeta && this.board.elPasantMeta.elPasantCheck) {
      basic.push(this.getElPasantMove());
    }
    return basic;
  }

  getAttacks(): Tile[] {
    return this.getBasicMoves(true);
  }

  move(tile: Tile): any {
    const elPasantCheck = (this.position.row - tile.position.row) % 2 === 0;
    console.log(this.position.row, tile.position.row);
    super.move(tile);
    this.haventMoved = false;
    if (tile.position.row === this.lastTileIndex) {
      this.board.removeFigure(this);
      this.color ? this.board.createWhiteFigure(Queen, this.tile) : this.board.createBlackFigure(Queen, this.tile);
      return;
    }

    if (this.board.elPasantMeta) {
      const pos = {row: this.position.row - this.direction, y: this.position.y};
      if (this.board.posEqual(pos, this.board.elPasantMeta.elPasantPosition)) {
        this.board.removeFigure(this.board.getTileByPosition(pos).holder);
      }
    }

    return {
      elPasantCheck,
      elPasantPosition: tile.position,
    };
  }

  check(row, y, protection): Tile | null {
    const r = this.board.rows[row];
    if (r && r[y]) {
      if (r[y].holder && (r[y].holder.color !== this.color || protection)) {
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
    const r = this.position.row;
    const nr = this.getNextRow();
    if (this.board.posEqual({row: r, y: this.position.y - 1}, this.board.elPasantMeta.elPasantPosition)) {
      return this.board.getTileByPosition({row: nr, y: this.position.y - 1});
    }
    if (this.board.posEqual({row: r, y: this.position.y + 1}, this.board.elPasantMeta.elPasantPosition)) {
      return this.board.getTileByPosition({row: nr, y: this.position.y + 1});
    }
  }

  private getNextRow(): number {
    return this.position.row + this.direction;
  }

  private getBasicMoves( protection: boolean) {
    const nextRow = this.getNextRow();
    const basic =  [
      this.check(nextRow, this.position.y - 1, protection),
      this.check(nextRow, this.position.y + 1, protection),
    ];
    if (!protection) {
      const check = this.checkStr(nextRow, this.position.y);
      basic.push(check);
      if (this.haventMoved && check) {
        basic.push(this.checkStr(nextRow + this.direction, this.position.y));
      }
    }
    return basic.filter(el => !!el);
  }

}
