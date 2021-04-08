import {Position} from './position';
import {Tile} from './tile';

export interface AbstractFigure {
  position: Position;
  image: string;
  color: boolean;

  // findLegalMoves(): Position[];
  findPseudoLegalMoves(dontCheckDanger?: boolean): Tile[];
  move?(tile: Tile): void;
}
