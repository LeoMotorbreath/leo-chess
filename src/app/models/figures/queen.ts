import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris}  from  'src/app/shared/globalConsts';
import {Board} from '../board';
import {Tile} from '../tile';
import {getDiagonalMoves} from '../diagonalMovable';
import {Movable} from '../movable';
import {getStraightMoves} from '../straightMovable';



export class Queen extends Movable implements AbstractFigure  {
  image: string;

  constructor(pos: Position, color: boolean, board: Board) {
    super(board, pos, color);
    this.image = color ? Guris.svgw + Guris.queen : Guris.svgb + Guris.queen;
  }

  findPseudoLegalMoves(): Tile[] {
    return this.getStraightMoves().concat(this.getDiagonalMoves());
  }

  private getDiagonalMoves(): Tile[] {
    return getDiagonalMoves.bind(this)();
  }

  private getStraightMoves(): Tile[] {
    return getStraightMoves.bind(this)();
  }
}
