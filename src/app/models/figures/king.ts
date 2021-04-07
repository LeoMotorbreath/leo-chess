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

  findPseudoLegalMoves(): Tile[] {
    if (!this.haveMoved && this.board.isPositionUnderAttack(this.position, !this.color)) {
      console.log('we try to castle');
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
}
