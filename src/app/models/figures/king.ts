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
    if ( this.haventMoved && !dontCheckDanger && !this.board.isPositionUnderAttack(this.position, !this.color)) {
      console.warn('we try to castle!');
      const row = (this.board.rows[this.position.row])
      if (row[0].holder && (row[0].holder as HaveMoved).haventMoved) {
        this.getCastlePathIsUnderAttack(0,this.position.y - 1, row);
      }
      if(row[7].holder && (row[7].holder as HaveMoved).haventMoved) {
        this.getCastlePathIsUnderAttack(this.position.y + 1, 8, row);
      }
    }
    return [
      this.check(this.position.row + 1, this.position.y - 1),
      this.check(this.position.row + 1, this.position.y),
      this.check(this.position.row + 1, this.position.y + 1),
      this.check(this.position.row, this.position.y - 1),
      this.check(this.position.row, this.position.y + 1),
      this.check(this.position.row - 1, this.position.y + 1),
      this.check(this.position.row - 1, this.position.y),
      this.check(this.position.row - 1, this.position.y - 1),
    ].filter(el => !!el);
  }

  private getCastleMoves(): Tile[] {
    if (this.haventMoved && !this.board.isPositionUnderAttack(this.position, !this.color)) {
      console.warn('we try to castle!');
      // this.getCastlePathIsUnderAttack(0,)
    }
    return [];
  }

  private getCastlePathIsUnderAttack(start, end, row): boolean {
    for (let i = start; i < end; i++) {

      console.log(row[i],this.board.isPositionUnderAttack(row[i].position, !this.color))
    }
    return true;
  }
}
