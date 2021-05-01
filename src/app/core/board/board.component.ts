import { Component, OnInit } from '@angular/core';
import {Board} from '../../models/board';
import {Tile} from '../../models/tile';
import {Position} from '../../models/position';
import {AbstractFigure} from "../../models/abstract-figure";


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
      const result = tile.holder
        .findPseudoLegalMoves(false)
        .filter(el => !!el)
        .filter(newTile =>
          !(tile.holder as AbstractFigure).board.isKingUnderAttackAfterMove(newTile.position, tile.holder.position, tile.holder.color)
        );

        this.setPossibleMoves(result);
  }

  callMoveFigure(newTile: Tile) {
    this.bd.moveFigure(newTile, this.selectedFigureTile.holder);
    this.endTurn();
  }

  getTileBackground(tile: Tile) {
    if (tile === this.selectedFigureTile) {
      return 'lightgreen';
    }

    if (this.bd.kingUnderAttack && (tile === this.bd.getTileByPosition(this.bd.kingUnderAttack))) {
      return 'red';
    };
  }

  handleClick(tile: Tile) {
    if (this.selectedFigureTile && (this.selectedFigureTile.holder === tile.holder)) {
      this.unselectFigure();
      return;
    }
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
