import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {getDiagonalMoves} from '../diagonalMovable';
import {Board} from '../board';
import {Tile} from '../tile';
import {Movable} from '../movable';

export class Bishop extends Movable implements AbstractFigure  {
  image: string;
  color: boolean;

  constructor(pos: Position, color: boolean, board: Board) {
    super(board, pos, color);
    this.image = color ? Guris.svgw + Guris.bishop : Guris.svgb + Guris.bishop;
  }

  findPseudoLegalMoves(): Tile[] {
    return this.getDiagonalMoves(false);
  }

  getAttacks(): Tile[] {
    return this.getDiagonalMoves(true);
  }

  private getDiagonalMoves(protection: boolean) {
    return getDiagonalMoves.bind(this)(protection);
  }


}
