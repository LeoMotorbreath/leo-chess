import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {Board, Row} from '../board';
import {Tile} from '../tile';
import {IHaveMoved} from '../haveMoved';
import {Movable} from '../movable';

export class King extends Movable implements AbstractFigure, IHaveMoved {
  image: string;
  haventMoved = true;
  readonly isKing = true;

  constructor(pos: Position, color: boolean, board: Board) {
    super(board, pos, color);
    this.image = color ? Guris.svgw + Guris.king : Guris.svgb + Guris.king ;
  }

  findPseudoLegalMoves(dontCheckDanger: boolean): Tile[] {
    const row = (this.board.rows[this.position.row]);
    const x = this.board.getTileByPosition(this.position)
    const f = x.holder;
    x.holder = null;
    const defaultMoves = this.filterProtected(this.getDefaultMoves(false));
    if (this.kingIsReadyToCastle(dontCheckDanger)) {
      if (this.rookReadyToCastle(row, 0) && this.getCastlePathValid(1, this.position.y, row)) {
        defaultMoves.push(row[0]);
      }

      if (this.rookReadyToCastle(row, 7) && this.getCastlePathValid(this.position.y + 1, 7, row)) {
        defaultMoves.push(row[7]);
      }
    }
    x.holder = f;

    return defaultMoves;
  }

  getAttacks(): Tile[] {
    return this.getDefaultMoves(true);
  }

  move(tile: Tile) {
    super.move(tile);
    this.haventMoved = false;
  }

  private getCastlePathValid(start, end, row: Row): boolean {
    for (let i = start; i < end; i++) {
     if (row[i].holder || this.board.isTileUnderAttack(row[i], !this.color)) {
       return false;
     }
    }
    return true;
  }

  private kingIsReadyToCastle(dontCheckDanger: boolean): boolean {
    return !dontCheckDanger && this.haventMoved && !this.board.isTileUnderAttack(this.board.getTileByPosition(this.position), !this.color);
  }

  private rookReadyToCastle(row, index: number): boolean {
    return row[index].holder && row[index].holder.color === this.color && row[index].holder.haventMoved;
  }

  private filterProtected(tiles: Tile[]): Tile[] {
    const attacksHash = this.board
      .getAttacks(!this.color)
      .reduce((acc, value) => {
        acc[value.id] = value;
        return acc;
      }, {});
    return tiles.filter(tile => !attacksHash[tile.id]);
  }

  private getDefaultMoves(protection: boolean): Tile[] {
    return [
      this.check(this.position.row, this.position.y - 1, protection),
      this.check(this.position.row, this.position.y + 1, protection),
      this.check(this.position.row - 1, this.position.y, protection),
      this.check(this.position.row + 1, this.position.y, protection),
      this.check(this.position.row - 1, this.position.y + 1, protection),
      this.check(this.position.row - 1, this.position.y - 1, protection),
      this.check(this.position.row + 1, this.position.y - 1, protection),
      this.check(this.position.row + 1, this.position.y + 1, protection),
    ].filter(el => !!el);
  }
}
