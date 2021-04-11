import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {Board} from '../board';
import {Tile} from '../tile';
import {HaveMoved} from '../haveMoved';

export class King extends HaveMoved implements AbstractFigure {
  image: string;

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

    if ( this.kingIsReadyToCastle(dontCheckDanger)) {
      if (this.rookReadyToCastle(row, 0) && this.getCastlePathValid(1,this.position.y - 1, row)) {
        def.push(row[0])
      } else {
        console.error('invalid')
      }
      // if(this.kingReadyToCastle(row, 7) && this.getCastlePathValid(this.position.y + 1, 8, row)) {
      // } else {
      //   console.error('invalid')
      // }
    }
    return

    return []
  }

  private getCastlePathValid(start, end, row): boolean {
    let result = false;
    for (let i = start; i < end; i++) {
     if(!row[i].holder && !this.board.isPositionUnderAttack(row[i].position, !this.color)) {
       result = true;
     }
    }
    return result;
  }

  private kingIsReadyToCastle(dontCheckDanger) {
    return this.haventMoved && !dontCheckDanger && !this.board.isPositionUnderAttack(this.position, !this.color);
  }

  private rookReadyToCastle(row, index) {
    return row[index].holder && row[index].holder.color === this.color && (row[index].holder as HaveMoved).haventMoved;
  }


}
