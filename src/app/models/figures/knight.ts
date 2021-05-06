import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {Movable} from '../movable';
import {Board} from '../board';
import {Tile} from '../tile';

export class Knight extends Movable implements AbstractFigure {
  image: string;
  engineValue = 3;
  constructor(tile: Tile, color: boolean, board: Board) {
    super(board, tile, color);
    this.image = color ? Guris.svgw + Guris.knight  : Guris.svgb + Guris.knight ;
  }

  findPseudoLegalMoves(): Tile[] {
    return [
      this.check(this.position.row - 1, this.position.y + 2),
      this.check(this.position.row + 1, this.position.y + 2),
      this.check(this.position.row - 1, this.position.y - 2),
      this.check(this.position.row + 2, this.position.y + 1),
      this.check(this.position.row + 2, this.position.y - 1),
      this.check(this.position.row + 1, this.position.y - 2),
      this.check(this.position.row - 2, this.position.y - 1),
      this.check(this.position.row - 2, this.position.y + 1),
    ].filter(el => !!el);
  }

  getAttacks(): Tile[] {
    return [
      this.check(this.position.row - 1, this.position.y + 2, true),
      this.check(this.position.row + 1, this.position.y + 2, true),
      this.check(this.position.row - 1, this.position.y - 2, true),
      this.check(this.position.row + 2, this.position.y + 1, true),
      this.check(this.position.row + 2, this.position.y - 1, true),
      this.check(this.position.row + 1, this.position.y - 2, true),
      this.check(this.position.row - 2, this.position.y - 1, true),
      this.check(this.position.row - 2, this.position.y + 1, true),
    ].filter(el => !!el);
  }

}

