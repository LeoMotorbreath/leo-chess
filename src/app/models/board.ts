import { Tile } from './tile';
import {AbstractFigure} from './abstract-figure';
import {Pawn} from './figures/pawn';
import {Position} from './position';
import {FList} from '../shared/figuresList';
import {King} from './figures/king';
import {Rook} from './figures/rook';

type Row = Tile[];
type Rows = Row[];



export class Board {
  rows: Rows = [];
  whiteFigures: AbstractFigure[] = [];
  blackFigures: AbstractFigure[] = [];
  currentTurn = true;
  isElPassantCheckNeeded: false;


  constructor() {
    this.rows = this.generateBoard();
    this.placeFiguresOnBoard(this.rows);
  }

  generateBoard(): Rows {
    const rows = [];
    for (let row = 0; row < 8; row++) {
      rows[row] = [];
      for (let ceil = 0; ceil < 8; ceil++) {
        rows[row].push(new Tile({row, y: ceil}, Boolean((row + ceil) % 2)));
      }
    }
    return rows;
  }

  placeFiguresOnBoard(rows: Rows) {
    for (let i = 0; i < 8; i++) {
      this.whiteFigures.push(rows[1][i].holder = new Pawn(rows[1][i].position, true, this));
      this.blackFigures.push(rows[6][i].holder = new Pawn(rows[6][i].position, false, this));
      this.whiteFigures.push(rows[0][i].holder = new FList.$[FList.strFiguresRep[i]](rows[0][i].position, true, this));
      this.blackFigures.push(rows[7][i].holder = new FList.$[FList.strFiguresRep[7 - i]](rows[7][i].position, false, this));
    }
  }

  removeFigure(figure: AbstractFigure): void {
    if (figure.color) {
      this.whiteFigures = this.whiteFigures.filter(el => el !== figure);
    } else {
      this.blackFigures = this.blackFigures.filter(el => el !== figure);
    }
  }

  castle(king: King, castle: Rook): void {
    return null
  }

  isPositionUnderAttack(position: Position, attackersColor: boolean): boolean {
    const figuresToCheck =  attackersColor ? this.whiteFigures : this.blackFigures;
    for (let i = 0; i < figuresToCheck.length; i++) {
      if (figuresToCheck[i].findPseudoLegalMoves().find(tile => this.posEqual(tile.position, position))) {
        console.error('very fuck');
      };
    }
    return false;
  }

  private posEqual(pos1: Position, pos2: Position): boolean {
    return (pos1.row === pos2.row) && (pos1.y === pos2.y);
  }
}
