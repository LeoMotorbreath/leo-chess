import { Tile } from './tile';
import {AbstractFigure} from '../intrefaces/abstract-figure';
import {Pawn} from '../figures/pawn';
import {Position} from '../types/position';
import {FList} from '../../shared/figuresList';
import {King} from '../figures/king';
import {Subject} from 'rxjs';
import {getRestartGameStream} from '../../core/match-result-modal/match-result-modal.component';
import {take} from 'rxjs/operators';
import {MoveEmulatorData} from '../types/med';
import { Rows } from '../types/row';

interface ElPasantMeta {
  elPasantCheck: boolean;
  elPasantPosition: Position;
}

type getAllPPMovesMEDArg = {
  color?: boolean,
  figures?: AbstractFigure[]
}
export class Board {
  rows: Rows = [];
  figures: AbstractFigure[] = [];
  elPasantMeta: ElPasantMeta | null;
  kingUnderAttack: Position | null;
  currentTurn = false;
  static ins: Board | null;
  gameResultStream = new Subject();

  constructor() {

    if (Board.ins) {
      return Board.ins;
    } else {
      this.initField();
      Board.ins = this;
    }
    console.log(this)
  }



  moveFigure(tile: Tile, figure: AbstractFigure) {
    this.removeFigure((tile.holder as AbstractFigure));
    figure.tile.holder = null;
    this.endTurn(figure.move(tile));
  }

  endTurn(meta?) {
    this.currentTurn = !this.currentTurn;
    this.elPasantMeta = meta;
    this.kingUnderAttack = this.isKingUnderAttack(this.currentTurn);
    if (this.kingUnderAttack && this.isCheckMate(this.currentTurn)) {
      this.emitGameResult({text: (`check mate!  ${this.currentTurn ? 'white' : 'black'} won!`)});
      return;
    }
    if (this.isPat(this.currentTurn)) {
      this.emitGameResult({text: 'pat! game is over with draw result!!!'});
      return;
    }
  }


  filterPseudoPossibleMove(tile: Tile, moves: Tile[]): Tile[] {
    const callBack = (color) => !this.isPositionUnderAttack(this.findKing(color).position, !color);
    return moves.filter(newTile => this.emulateMove(this.getMoveEmultorDataTemp(tile, newTile.position), callBack));
  }

  emulateMove(moveEmulatorDate: MoveEmulatorData, callBack: (arg: any) => unknown) {
    const newTile = this.getTileByPosition(moveEmulatorDate.newPos);
    const prevTile = this.getTileByPosition(moveEmulatorDate.prevPos);
    const prevTileFigure = prevTile.holder;
    const newTileFigure = newTile.holder;
    this.removeFigure(newTileFigure);
    prevTile.holder = null;
    newTile.holder = prevTileFigure;
    const result = callBack(...moveEmulatorDate.args);
    prevTile.holder = prevTileFigure;
    newTile.holder = null;
    this.placeFigure(newTileFigure);
    return result;
  }

  removeFigure(figure: AbstractFigure): void {
    if (!figure) return;
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
    return this
      .getFiguresArray(attackersColor)
      .map((el) => el.getAttacks())
      .reduce((acc, curValue) => acc.concat(curValue))
      .reduce((acc, tile) => !!acc || this.posEqual(tile.position, position), false);
  }

  isTileUnderAttack(tile: Tile, attackersColor: boolean): boolean {
    return this.getFiguresArray(attackersColor)
      .map(af => af.getAttacks())
      .reduce((acc, value) => acc.concat(value), [])
      .some(attackedTile => attackedTile.id === tile.id);
  }

  getTileByPosition(pos: Position, rows?: Rows): Tile {
    return (rows || this.rows)[pos.row][pos.y];
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
    if (figure) this.figures.push(this.getTileByPosition(figure.position).holder = figure);
  }

  getFiguresArray(color: boolean): AbstractFigure[] {
    return this.figures.filter(figure => figure.color === color);
  }

  findKing(color: boolean): King {
    return (this.getFiguresArray(color).find(figure => (figure as King).isKing) as King);
  }

  isPat(color: boolean): boolean {
    const figuresWithoutKingMoves = this
      .getFiguresArray(color)
      .filter(el => el !== this.findKing(color))
      .reduce((acc, f) => acc.concat(f.findPseudoLegalMoves()), []);
    return !figuresWithoutKingMoves.length && !this.isPositionUnderAttack(this.findKing(color).position, !color);
  }

  getAllPPMovesMED(arg: getAllPPMovesMEDArg): MoveEmulatorData[] {
    return (arg.figures || this.getFiguresArray(arg.color))
      .map((af) => [...af.findPseudoLegalMoves()].map((tile) => this.getMoveEmulatorData(af, tile.position)))
      .reduce((acc, value) => acc.concat(value), []);
  }

  private initField() {
    this.rows = this.generateBoard();
    this.placeFiguresOnBoard(this.rows);
    this.endTurn();
  }

  private getMoveEmultorDataTemp(prevTile: Tile, newPos: Position): MoveEmulatorData {
    return {
      newPos,
      prevPos: prevTile.holder.position,
      color: prevTile.holder.color,
      args: [prevTile.holder.color]
    };
  }

  private generateBoard(): Rows {
    const rows = [];
    for (let row = 0; row < 8; row++) {
      rows[row] = [];
      for (let ceil = 0; ceil < 8; ceil++) {
        rows[row].push(new Tile({row, y: ceil}, Boolean((row + ceil) % 2)));
      }
    }
    Tile.count = 0;
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
      kp: {
        row,
        y: isShort ? kp.y - 2 : kp.y + 2
      },
      rp: {
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


  private getMoveEmulatorData(figure: AbstractFigure, newPos: Position): MoveEmulatorData {
    return {
      newPos,
      prevPos: figure.position,
      color: figure.color,
    };
  }

  private isCheckMate(color: boolean): boolean {
    return !this
      .getFiguresArray(color)
      .map((figure) => figure.findPseudoLegalMoves().map((tile) => this.getMoveEmulatorData(figure, tile.position)))
      .reduce((acc: any[], value: any[]) => acc.concat(value), [])
      .filter((data) => this.emulateMove(data, () => !this.isKingUnderAttack(data.color))).length;
  }

  private emitGameResult(any: any) {
    this.gameResultStream.next(any);
    getRestartGameStream().pipe(take(1)).subscribe(() => this.initField());
  }

  getFieldClone(): Tile[] {
    return this.rows.reduce((res, value) => res.concat(value.map(tile => ({...tile} as Tile))),[])
  }

  cloneFigures(): AbstractFigure[] {
    const hash = this.getFieldClone().reduce((hash, value) => {
      hash[value.id] = value;
      return hash;
    });

    return this.figures.map(figure => ({...figure, tile: hash[figure.tile.id]}));
  }
}