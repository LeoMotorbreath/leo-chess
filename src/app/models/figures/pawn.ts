import {AbstractFigure} from '../abstract-figure';
import {Position} from '../position';
import {Guris} from '../../shared/globalConsts';
import {HaveMoved} from '../haveMoved';
import {Board} from '../board';
import {Tile} from '../tile';
import {Movable} from '../movable';

export class Pawn extends Movable implements AbstractFigure, HaveMoved {
  color: boolean;
  image: string;
  position: Position;
  haveMoved = false;
  isFirstMoveFeatureValid = true;
  board: Board;
  private readonly direction: 1 | -1;
  constructor(pos: Position, color: boolean, board) {
    super(board, pos, color);
    this.image = color ? Guris.svgw + Guris.pawn : Guris.svgb + Guris.pawn;
    this.direction = color ? 1 : -1;
  }
//rework
  findPseudoLegalMoves(): Tile[] {
    const positions = [];
    const row = this.board.rows[this.position.row + this.direction];
    const x = row[this.position.y - 1];
    if (x && x.holder && x.holder.color !== this.color) {
      positions.push(x);
    }
    const y = row[this.position.y + 1];
    if (y && y.holder && y.holder.color !== this.color) {
      positions.push(y);
    }
    for (let i = 1 ; (this.haveMoved ? 2 : 3) > i ; i++) {
      const row = this.board.rows[this.position.row + (i * this.direction)];
      if(!row[this.position.y].holder) {
        positions.push(row[this.position.y]);
      }
    }
    return positions;
  }

  move(position: Position) {
    this.haveMoved = true;
    this.position = position;
  }

}
