import { Component, OnInit } from '@angular/core';
import {Board} from '../../models/board';
import {Tile} from '../../models/tile';
import {AbstractFigure} from '../../models/abstract-figure';
import {Position} from '../../models/position';

export interface TurnMetadata {
  isValid: boolean;
  isFigureSelected: boolean;
  isCancel: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {


  bd: Board;
  selectedFigureTile: Tile;
  currentTurn = true;
  possibleMoves: Tile[] = [];

  constructor() {

  }

  ngOnInit() {
    this.bd = new Board();
  }


  selectFigure(tile: Tile) {
    this.selectedFigureTile = tile;
    this.setPossibleMoves(this.selectedFigureTile.holder.findPseudoLegalMoves());
  }

  moveFigure(newTile: Tile) {
    this.selectedFigureTile.holder.move(newTile);
    newTile.holder = this.selectedFigureTile.holder;
    this.selectedFigureTile.holder = null;
    this.endTurn();
  }

  handleClick(tile: Tile) {
    if (tile.holder) {
      if (tile.holder.color === this.currentTurn) {
        if (this.selectedFigureTile && (this.selectedFigureTile.holder === tile.holder) && this.isTileInPosibleMoves(tile)) {
          this.unselectFigure();
        } else {
          this.selectFigure(tile);
        }
      } else if (this.selectedFigureTile) {
        this.moveFigure(tile);
      }
    } else {
      if (this.selectedFigureTile) {
        this.moveFigure(tile);
      }
    }
  }

  newHandleClick(tile: Tile) {
    if (tile.holder && tile.holder.color === this.currentTurn) {
      this.selectFigure(tile);
    } else {
      if (this.selectedFigureTile && this.isTileInPosibleMoves(tile)) {
        this.moveFigure(tile);
      } else {
        this.unselectFigure();
      }
    }
  }

  private endTurn() {
    this.currentTurn = !this.currentTurn;
    this.unselectFigure();
    this.setPossibleMoves([]);
  }

  private setPossibleMoves(pmoves: Tile[]) {
    this.possibleMoves.forEach(el => el.style.border = 'none');
    this.possibleMoves = pmoves;
    this.possibleMoves.forEach(el => el.style.border = '2px green solid');
  }

  private isTileInPosibleMoves(tile: Tile): boolean {
    return this.possibleMoves.some(pmove => pmove === tile);
  }

  private unselectFigure() {
    this.selectedFigureTile = null;
    this.setPossibleMoves([]);
  }
}
