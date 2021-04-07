import {getStraightMoves} from '../straightMovable';
import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {Board} from '../board';
import {Tile} from '../tile';
import {Movable} from '../movable';
import {HaveMoved} from '../haveMoved';

export class Rook extends HaveMoved implements AbstractFigure  {
  image: string;

  constructor(pos: Position, color: boolean, board: Board) {
    super(board, pos, color);
    this.image = color ? Guris.svgw + Guris.rook : Guris.svgb + Guris.rook;
  }

  findPseudoLegalMoves(): Tile[] {
    return this.getStraightMoves();
  }

  private getStraightMoves(): Tile[] {
    return getStraightMoves.bind(this)();
  }
}
