import { Tile } from './tile';
import {AbstractFigure} from './abstract-figure';
import {Pawn} from './figures/pawn';
import {Position} from './position';
import {FList} from '../shared/figuresList';
import {King} from './figures/king';

export type Row = Tile[];
type Rows = Row[];
interface ElPasantMeta {
  elPasantCheck: boolean,
  elPasantPosition: Position
}
export class Board {
  rows: Rows = [];
  figures: AbstractFigure[] = [];
  elPasantMeta: ElPasantMeta | null;
  kingUnderAttack: Position | null;
  currentTurn = true;

  constructor() {
    this.rows = this.generateBoard();
    this.placeFiguresOnBoard(this.rows);
    this.kingUnderAttack = this.isKingUnderAttack(this.currentTurn);
  }

  moveFigure(tile: Tile, figure: AbstractFigure) {
    this.removeFigure((tile.holder as AbstractFigure));
    figure.tile.holder = null;
    tile.holder = figure;
    this.endTurn(figure.move(tile));
  }

  endTurn(meta?) {
    this.currentTurn = !this.currentTurn;
    this.elPasantMeta = meta;
    this.kingUnderAttack = this.isKingUnderAttack(this.currentTurn);
  }

  isMoveCauseAttackToKing(defPos: Position, color: boolean) {
    const kingTile = this.getFiguresArray(color).find((figure: King) => figure.isKing).tile
    const defTile = this.getTileByPosition(defPos);
    const figgure = defTile.holder;
    defTile.holder = null;
    const result = this.isTileUnderAttack(kingTile, !color);
    defTile.holder = figgure;
    return result;
  }

  isKingUnderAttackAfterMove(newPos: Position, prevPos: Position, color: boolean) {
    const newTile = this.getTileByPosition(newPos);
    const prevTile = this.getTileByPosition(prevPos);
    const prevTileFigure = prevTile.holder;
    const newTileFigure = newTile.holder;
    this.removeFigure(newTileFigure)
    prevTile.holder = null;
    newTile.holder = prevTileFigure;
    const result = this.isPositionUnderAttack(this.getFiguresArray(color).find((figure: King) => figure.isKing).position, !color)
    prevTile.holder = prevTileFigure;
    newTile.holder = null;
    this.placeFigure(newTileFigure);
    return result;
  }

  removeFigure(figure: AbstractFigure): void {
    if(!figure) return;
    figure.tile.holder = null;
    this.figures = this.figures.filter(el => el !== figure);
  }

  castle(kingPos: Position, rookPos: Position): void {
    const row = kingPos.row;
    const newPositions = this.getNewPositionsForCastling(row, kingPos, rookPos);
    const prevKTile = this.getTileByPosition(kingPos);
    const prevRTile = this.getTileByPosition(rookPos);
    this.getTileByPosition(newPositions.kp).holder = prevKTile.holder;
    this.getTileByPosition(newPositions.rp).holder = prevRTile.holder;
    prevKTile.holder = prevRTile.holder = null;
    this.endTurn();
  }

  isPositionUnderAttack(position: Position, attackersColor: boolean): boolean {
    return this.getFiguresArray(attackersColor).
      map((el) => el.getAttacks()).
      reduce((acc, curValue) => acc.concat(curValue)).
      reduce((acc, tile) => !!acc || this.posEqual(tile.position, position), false);
  }

  isTileUnderAttack(tile: Tile, attackersColor: boolean): boolean {
     return this.getFiguresArray(attackersColor)
       .map(af => af.getAttacks())
       .reduce((acc, value) => acc.concat(value))
       .some(attackedTile => attackedTile.id === tile.id);
  }

  getTileByPosition(pos: Position): Tile {
    return this.rows[pos.row][pos.y];
  }

  posEqual(pos1: Position, pos2: Position): boolean {
    return (pos1.row === pos2.row) && (pos1.y === pos2.y);
  }

  getAttacks(attackerColor: boolean): Tile[] {
    return this.getFiguresArray(attackerColor)
      .map((af: AbstractFigure) => af.getAttacks())
      .reduce((acc, value) => acc.concat(value));
  }

  createWhiteFigure(figureClass, tile: Tile) {
    this.figures.push(new figureClass(tile, true, this));
  }

  createBlackFigure(figureClass, tile: Tile) {
    this.figures.push(new figureClass(tile, false, this));
  }

  placeFigure(figure: AbstractFigure) {
    if(figure) this.figures.push(this.getTileByPosition(figure.position).holder = figure)
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
      this.createWhiteFigure(Pawn, rows[1][i]);
      this.createBlackFigure(Pawn, rows[6][i]);
      this.createWhiteFigure(FList.$[FList.strFiguresRep[i]], rows[0][i]);
      this.createBlackFigure(FList.$[FList.strFiguresRep[i]], rows[7][i]);
    }
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
      return null;
    }
  }
}
