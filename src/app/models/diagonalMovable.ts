import {Movable} from './movable';
import {Board} from './board';
import {Position} from './position';
import {Tile} from './tile';
import {AbstractFigure} from './abstract-figure';



export function getDiagonalMoves() {
  const moves = [];

  for (let i = 1; i < 8; i++) {
    let row = this.board.rows[this.position.row + i];
    if (row && row[this.position.y + i]) {
      let tile = row[this.position.y + i];
      moves.push(tile);
      if(tile.holder) {
        if (tile.holder.color === this.color) {
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
        if (tile.holder.color === this.color) {
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
        if (tile.holder.color === this.color) {
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
        if (tile.holder.color === this.color) {
          moves.pop();
        }
        break;
      }
    }
  }
  // for (let i = )
  return moves;
}


// export class DiagonalMovable1 extends Movable {
//   constructor(board: Board, position: Position, color: boolean) {
//     super(board, position, color);
//   }
//
//   getDiagonalMoves(): Tile[] {
//     const moves = [];
//
//     for (let i = 1; i < 8; i++) {
//       let row = this.board.rows[this.position.row + i];
//       if (row && row[this.position.y + i]) {
//         let tile = row[this.position.y + i];
//         moves.push(tile);
//         if(tile.holder) {
//           if (tile.holder.color === this.color) {
//             moves.pop();
//           }
//           break;
//         }
//       }
//     }
//
//     for (let i = 1; i < 8; i++) {
//       let row = this.board.rows[this.position.row - i];
//       if (row && row[this.position.y - i]) {
//         let tile = row[this.position.y - i];
//         moves.push(tile);
//         if(tile.holder) {
//           if (tile.holder.color === this.color) {
//             moves.pop();
//           }
//           break;
//         }
//       }
//     }
//
//     for(let i = 1; i < 8; i++) {
//       let row = this.board.rows[this.position.row + i];
//       if (row && row[this.position.y - i]) {
//         let tile = row[this.position.y - i];
//         moves.push(tile);
//         if(tile.holder) {
//           if (tile.holder.color === this.color) {
//             moves.pop();
//           }
//           break;
//         }
//       }
//     }
//
//     for(let i = 1; i < 8; i++) {
//       let row = this.board.rows[this.position.row - i];
//       if (row && row[this.position.y + i]) {
//         let tile = row[this.position.y + i];
//         moves.push(tile);
//         if(tile.holder) {
//           if (tile.holder.color === this.color) {
//             moves.pop();
//           }
//           break;
//         }
//       }
//     }
//     // for (let i = )
//     return moves;
//   }
// }
