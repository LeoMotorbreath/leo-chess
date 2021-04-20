import { Tile } from './tile';
import {AbstractFigure} from './abstract-figure';
import {Pawn} from './figures/pawn';
import {Position} from './position';
import {FList} from '../shared/figuresList';
import {King} from './figures/king';
import {Movable} from "./movable";
import {Queen} from "./figures/queen";
import {catchError} from "rxjs/operators";


type Row = Tile[];
type Rows = Row[];
interface ElPasantMeta {
  elPasantCheck: boolean,
  elPasantPosition: Position
}
export class Board {
  rows: Rows = [];
  currentTurn = true;
  elPasantMeta: ElPasantMeta | null;
  kingUnderAttack: null | Position;
  figures: AbstractFigure[] = [];
  constructor() {
    this.rows = this.generateBoard();
    this.placeFiguresOnBoard(this.rows);
    this.kingUnderAttack = this.isKingUnderAttack(this.currentTurn);
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
    this.elPasantMeta = meta;
    this.kingUnderAttack = this.isKingUnderAttack(this.currentTurn);
  }

  removeFigure(figure: AbstractFigure): void {
    this.getTileByPosition(figure.position).holder = null;
    this.figures = this.figures.filter(el => el !== figure);
  }

  castle(kingPos: Position, rookPos: Position): void {
    const row = kingPos.row;
    const newPositions = this.getNewPositionsForCastling(row, kingPos, rookPos);
    const prevKTile = this.getTileByPosition(kingPos);
    const prevRTile = this.getTileByPosition(rookPos);
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
    return this.figures.filter(figure => figure.color === color);
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
      // this.createWhiteFigure(Pawn, rows[1][i].position);
      // this.createBlackFigure(Pawn, rows[6][i].position);
      // this.createWhiteFigure(FList.$[FList.strFiguresRep[i]], rows[0][i].position);
      // this.createBlackFigure(FList.$[FList.strFiguresRep[i]], rows[7][i].position)
    }
    this.createWhiteFigure(King, {row: 0, y: 1});
    this.createBlackFigure(Queen, {row: 0, y: 2});
    this.createBlackFigure(King, {row: 0, y: 3});


  }

  private createWhiteFigure(figureClass, position: Position) {
    this.figures.push(this.getTileByPosition(position).holder = new figureClass(position, true, this));
  }

  private createBlackFigure(figureClass, position: Position) {
    this.figures.push(this.getTileByPosition(position).holder = new figureClass(position, false, this));
  }

  private getNewPositionsForCastling(row: number, kp: Position, rp: Position) {
    const isShort = kp.y > rp.y;
    return {
      kp : {
        row,
        y: isShort ? kp.y - 2 : kp.y + 2
      },
      rp : {
        row,
        y: isShort ? kp.y - 1 : kp.y + 1
      }
    };
  }

  private isKingUnderAttack(currentTurn: boolean): null | Position {
    try {
      const kingPosition = this.figures.find(el => (el as King).isKing && (el.color === currentTurn)).position;
      return this.isPositionUnderAttack(kingPosition, !currentTurn) ? kingPosition : null;
    } catch (error) {
     return null
    }
  }
}
