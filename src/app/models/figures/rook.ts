import {getStraightMoves} from '../straightMovable';
import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {Board} from '../board';
import {Tile} from '../tile';
import {Movable} from '../movable';
import {IHaveMoved} from "../haveMoved";

export class Rook extends Movable implements AbstractFigure, IHaveMoved  {
  image: string;
  haventMoved = true;
  engineValue = 5;
  constructor(tile: Tile, color: boolean, board: Board) {
    super(board, tile, color);
    this.image = color ? Guris.svgw + Guris.rook : Guris.svgb + Guris.rook;
  }

  findPseudoLegalMoves(): Tile[] {
    return this.getStraightMoves(false);
  }

  getAttacks(): Tile[] {
    return this.getStraightMoves(true);
  }

  move(tile: Tile) {
    super.move(tile);
    this.haventMoved = false;
  }

  private getStraightMoves(protection: boolean): Tile[] {
    return getStraightMoves.bind(this)(protection);
  }


}
