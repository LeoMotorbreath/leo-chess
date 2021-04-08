import {King} from './figures/king';
import {Rook} from './figures/rook';
import {Board} from './board';

export interface IGameController {
  isElPassantCheckNeeded: boolean;
  currentTurn: boolean;
  board: Board;
  isTileUnderAttack(tile): boolean;
  castle(king: King, castle: Rook): void;
}

export class GameController implements IGameController {
  board: Board;
  currentTurn = true;
  isElPassantCheckNeeded: false;

  constructor(board: Board) {
    this.board = board;
  }

  castle(king: King, castle: Rook): void {
  }

  isTileUnderAttack(tile): boolean {
    return false;
  }

}
