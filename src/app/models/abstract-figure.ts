import {Position} from './position';
import {Tile} from './tile';

export interface AbstractFigure {
  position: Position;
  image: string;
  color: boolean;

  findPseudoLegalMoves(dontCheckDanger?: boolean): Tile[];
  getAttacks?(): Tile[];
  move?(tile: Tile);
}
