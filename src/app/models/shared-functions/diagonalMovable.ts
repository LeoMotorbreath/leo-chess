export function getDiagonalMoves(protectionLeft?: boolean) {
  const moves = [];

  for (let i = 1; i < 8; i++) {
    let row = this.board.rows[this.position.row + i];
    if (row && row[this.position.y + i]) {
      let tile = row[this.position.y + i];
      moves.push(tile);
      if(tile.holder) {
        if (tile.holder.color === this.color && !protectionLeft) {
          moves.pop();
        }
        break;
      }
    }
  }

  for (let i = 1; i < 8; i++) {
    let row = this.board.rows[this.position.row - i];
    if (row && row[this.position.y - i]) {
      let tile = row[this.position.y - i];
      moves.push(tile);
      if(tile.holder) {
        if (tile.holder.color === this.color && !protectionLeft) {
          moves.pop();
        }
        break;
      }
    }
  }

  for(let i = 1; i < 8; i++) {
    let row = this.board.rows[this.position.row + i];
    if (row && row[this.position.y - i]) {
      let tile = row[this.position.y - i];
      moves.push(tile);
      if(tile.holder) {
        if (tile.holder.color === this.color && !protectionLeft) {
          moves.pop();
        }
        break;
      }
    }
  }

  for(let i = 1; i < 8; i++) {
    let row = this.board.rows[this.position.row - i];
    if (row && row[this.position.y + i]) {
      let tile = row[this.position.y + i];
      moves.push(tile);
      if(tile.holder) {
        if (tile.holder.color === this.color && !protectionLeft) {
          moves.pop();
        }
        break;
      }
    }
  }
  // for (let i = )
  return moves;
}
