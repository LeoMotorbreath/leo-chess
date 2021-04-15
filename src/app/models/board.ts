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
  elPasantCheck: boolean;

  constructor() {
    this.rows = this.generateBoard();
    this.placeFiguresOnBoard(this.rows);
  }

  moveFigure(tile: Tile, figure: AbstractFigure) {
    if (tile.holder) {
      this.removeFigure(tile.holder);
    }
    this.getTileByPosition(figure.position).holder = null;
    tile.holder = figure;
    this.endTurn(figure.move(tile));
  }

  endTurn(meta?) {
    this.currentTurn = !this.currentTurn;
    this.elPasantCheck = meta;
  }

  removeFigure(figure: AbstractFigure): void {
    this.getTileByPosition(figure.position).holder = null;
    if (figure.color) {
      this.whiteFigures = this.whiteFigures.filter(el => el !== figure);
    } else {
      this.blackFigures = this.blackFigures.filter(el => el !== figure);
    }
  }

  castle(kingPos: Position, rookPos: Position): void {
    let row = kingPos.row
    let newPositions = this.getNewPositionsForCastling(row, kingPos, rookPos);
    let prevKTile = this.getTileByPosition(kingPos);
    let prevRTile = this.getTileByPosition(rookPos);
    this.getTileByPosition(newPositions.kp).holder = prevKTile.holder;
    this.getTileByPosition(newPositions.rp).holder = prevRTile.holder;
    prevKTile.holder.position = newPositions.kp;
    prevRTile.holder.position = newPositions.rp;
    prevKTile.holder = prevRTile.holder = null;
    this.endTurn();
  }

  isPositionUnderAttack(position: Position, attackersColor: boolean): boolean {
    return this.getFiguresArray(attackersColor).
      map(el => el.findPseudoLegalMoves(true)).
      reduce((acc, curValue) => acc.concat(curValue)).
      reduce((acc, tile) => !!acc || this.posEqual(tile.position, position), false);
  }

  getTileByPosition(pos: Position): Tile {
    return this.rows[pos.row][pos.y];
  }

  posEqual(pos1: Position, pos2: Position): boolean {
    return (pos1.row === pos2.row) && (pos1.y === pos2.y);
  }

  private getFiguresArray(color: boolean): AbstractFigure[] {
    return color ? this.whiteFigures : this.blackFigures;
  }

  private generateBoard(): Rows {
    const rows = [];
    for (let row = 0; row < 8; row++) {
      rows[row] = [];
      for (let ceil = 0; ceil < 8; ceil++) {
        rows[row].push(new Tile({row, y: ceil}, Boolean((row + ceil) % 2)));
      }
    }
    return rows;
  }

  private placeFiguresOnBoard(rows: Rows) {
    for (let i = 0; i < 8; i++) {
      this.whiteFigures.push(rows[1][i].holder = new Pawn(rows[1][i].position, true, this));
      this.blackFigures.push(rows[6][i].holder = new Pawn(rows[6][i].position, false, this));
      this.whiteFigures.push(rows[0][i].holder = new FList.$[FList.strFiguresRep[i]](rows[0][i].position, true, this));
      this.blackFigures.push(rows[7][i].holder = new FList.$[FList.strFiguresRep[i]](rows[7][i].position, false, this));
    }
  }

  private getNewPositionsForCastling(row: number, kp: Position, rp: Position) {
    let isShort = kp.y > rp.y;
    return {
      kp : {
        row,
        y: isShort ? kp.y - 2 : kp.y + 2
      },
      rp : {
        row,
        y: isShort ? kp.y - 1 : kp.y +1
      }
    }
  }
}
