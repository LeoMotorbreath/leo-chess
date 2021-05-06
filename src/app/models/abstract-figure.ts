import {Position} from './position';
import {Tile} from './tile';
import {Board} from "./board";

export interface AbstractFigure {
  position: Position;
  board: Board;
  image: string;
  color: boolean;
  tile: Tile;
  engineValue: number;
  findPseudoLegalMoves(dontCheckDanger?: boolean): Tile[];
  getAttacks(): Tile[];
  move(tile: Tile);
}
