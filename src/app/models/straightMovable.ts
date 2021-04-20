import {Tile} from './tile';

//good to rework;
export function getStraightMoves(protectionLeft?: boolean): Tile[] {
  const moves = [];
  for (let row = this.position.row + 1; row < 8; row++) {
    const tile = this.board.rows[row][this.position.y];
    moves.push(tile);
    if (tile.holder) {
      if (tile.holder.color === this.color && !protectionLeft) {
        moves.pop();
      }
      break;
    }
  }

  for (let row = this.position.row - 1; row > -1; row--) {
    const tile = this.board.rows[row][this.position.y];
    moves.push(tile);
    if (tile.holder) {
      if (tile.holder.color === this.color && !protectionLeft) {
        moves.pop();
      }
      break;
    }
  };

  for (let ceil = this.position.y - 1; ceil > -1; ceil--) {
    const tile = this.board.rows[this.position.row][ceil];
    moves.push(tile);
    if (tile.holder) {
      if (tile.holder.color === this.color && !protectionLeft) {
        moves.pop();
      }
      break;
    }
  };

  for (let ceil = this.position.y + 1; ceil < 8; ceil++) {
    const tile = this.board.rows[this.position.row][ceil];
    moves.push(tile);
    if (tile.holder) {
      if (tile.holder.color === this.color && !protectionLeft) {
        moves.pop();
      }
      break;
    }
  };

  return moves;
}
