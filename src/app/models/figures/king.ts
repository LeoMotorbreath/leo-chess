import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {Board} from '../board';
import {Tile} from '../tile';
import {IHaveMoved} from '../haveMoved';
import {Movable} from "../movable";

export class King extends Movable implements AbstractFigure,IHaveMoved {
  image: string;
  haventMoved = true;

  constructor(pos: Position, color: boolean, board: Board) {
    super(board, pos, color);
    this.image = color ? Guris.svgw + Guris.king : Guris.svgb + Guris.king ;
  }

  findPseudoLegalMoves(dontCheckDanger: boolean): Tile[] {
    /// if remove dont check danger got stack overflow
    const row = (this.board.rows[this.position.row])

    const def = [
      this.check(this.position.row + 1, this.position.y - 1),
      this.check(this.position.row + 1, this.position.y),
      this.check(this.position.row + 1, this.position.y + 1),
      this.check(this.position.row, this.position.y - 1),
      this.check(this.position.row, this.position.y + 1),
      this.check(this.position.row - 1, this.position.y + 1),
      this.check(this.position.row - 1, this.position.y),
      this.check(this.position.row - 1, this.position.y - 1),
    ].filter(el => !!el);

    if (this.kingIsReadyToCastle(dontCheckDanger)) {
      if (this.rookReadyToCastle(row, 0) && this.getCastlePathValid(1,this.position.y, row)) {
        def.push(row[0])
      }

      if(this.rookReadyToCastle(row, 7) && this.getCastlePathValid(this.position.y + 1, 7, row)) {
        def.push(row[7])
      }
    }

    return def;
  }

  move(tile: Tile) {
    super.move(tile);
    this.haventMoved = false;
  }

  private getCastlePathValid(start, end, row): boolean {
    for (let i = start; i < end; i++) {
     console.warn(!row[i].holder)
     if(row[i].holder || this.board.isPositionUnderAttack(row[i].position, !this.color)) {
       return false;
     }
    }
    return true;
  }

  private kingIsReadyToCastle(dontCheckDanger) {
    return this.haventMoved && !dontCheckDanger && !this.board.isPositionUnderAttack(this.position, !this.color);
  }

  private rookReadyToCastle(row, index) {
    return row[index].holder && row[index].holder.color === this.color && row[index].holder.haventMoved;
  }

}
