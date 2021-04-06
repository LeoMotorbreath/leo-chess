import { Tile } from './tile';
import {AbstractFigure} from './abstract-figure';
import {Pawn} from './figures/pawn';
import {Position} from './position';
import {FList} from '../shared/figuresList';

type Row = Tile[];
type Rows = Row[];



export class Board {
  rows: Rows = [];
  tiles: Tile[] = [];
  figures: AbstractFigure[];

  constructor() {
    this.rows = this.generateBoard();
    this.placeFiguresOnBoard(this.rows);
  }

  generateBoard(): Rows {
    const rows = [];
    for (let row = 0; row < 8; row++) {
      rows[row] = [];
      for (let ceil = 0; ceil < 8; ceil++) {
        rows[row].push(new Tile({row, y: ceil}, Boolean((row+ceil)%2)));
      }
    }
    return rows;
  }

  placeFiguresOnBoard(rows: Rows) {
    for (let i = 0; i < 8; i++) {
      rows[1][i].holder = new Pawn(rows[1][i].position, true, this);
      rows[6][i].holder = new Pawn(rows[6][i].position, false, this);
      rows[0][i].holder = new FList.$[FList.strFiguresRep[i]](rows[0][i].position, true, this);
      rows[7][i].holder = new FList.$[FList.strFiguresRep[7 - i]](rows[7][i].position, false, this);
    }
  }

}
