import {Position} from './position';
import {Board} from './board';
import {Tile} from './tile';

export interface AbstractFigure {
  position: Position;
  image: string;
  color: boolean;

  // findLegalMoves(): Position[];
  findPseudoLegalMoves(): Tile[];
}
