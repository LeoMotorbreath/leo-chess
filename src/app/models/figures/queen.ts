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
    return this
      .getStraightMoves(false)
      .concat(this.getDiagonalMoves(false))
      .filter(tile => !this.board.isKingUnderAttackAfterMove(tile.position, this.position, this.color));
  }

  getAttacks(): Tile[] {
    return this.getStraightMoves(true).concat(this.getDiagonalMoves(true));
  }

  private getDiagonalMoves(protection: boolean): Tile[] {
    return getDiagonalMoves.bind(this)(protection);
  }

  private getStraightMoves(protection: boolean): Tile[] {
    return getStraightMoves.bind(this)(protection);
  }
}
