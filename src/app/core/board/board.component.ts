import { Component, OnInit } from '@angular/core';
import {Board} from '../../models/board';
import {Tile} from '../../models/tile';
import {AbstractFigure} from '../../models/abstract-figure';
import {Position} from '../../models/position';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  bd: Board;
  selectedFigureTile: Tile;
  possibleMoves: Tile[] = [];

  ngOnInit() {
    this.bd = new Board();
  }

  setFigureSelected(tile: Tile) {
    this.selectedFigureTile = tile;
    this.setPossibleMoves(this.selectedFigureTile.holder.findPseudoLegalMoves(false));
  }

  callMoveFigure(newTile: Tile) {
    this.bd.moveFigure(newTile, this.selectedFigureTile.holder);
    this.endTurn();
  }

  handleClick(tile: Tile) {
    if (tile.holder && tile.holder.color === this.bd.currentTurn && !this.isTileInPossibleMoves(tile)) {
      this.setFigureSelected(tile);
    } else {
      if (this.selectedFigureTile && this.isTileInPossibleMoves(tile)) {
        if (tile.holder && tile.holder.color === this.bd.currentTurn) {
          this.castle(this.selectedFigureTile.position, tile.position);
        } else {
          this.callMoveFigure(tile);
        }
      } else {
        this.unselectFigure();
      }
    }
  }

  private endTurn() {
    this.unselectFigure();
    this.setPossibleMoves([]);
  }

  private setPossibleMoves(pmoves: Tile[]) {
    this.possibleMoves.forEach(el => el.style.border = 'none');
    this.possibleMoves = pmoves;
    this.possibleMoves.forEach(el => el.style.border = '2px green solid');
  }

  private isTileInPossibleMoves(tile: Tile): boolean {
    return this.possibleMoves.some(pmove => pmove === tile);
  }

  private unselectFigure() {
    this.selectedFigureTile = null;
    this.setPossibleMoves([]);
  }

  private castle(kpos: Position, rpos: Position) {
    this.bd.castle(kpos, rpos);
    this.endTurn();
  }
}
