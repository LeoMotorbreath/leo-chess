import { Component, OnInit } from '@angular/core';
import {Board, MoveEmulatorData} from '../../models/board';
import {Tile} from '../../models/tile';
import {Position} from '../../models/position';
import {AbstractFigure} from "../../models/abstract-figure";
import {King} from "../../models/figures/king";
import {retry} from 'rxjs/operators';


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
        .findPseudoLegalMoves()
        .filter(el => Boolean(el))
        .filter(newTile => this.bd.emulateMove(this.getMoveEmultorData(tile, newTile.position), (color) => {
                  return !this.bd.isPositionUnderAttack(this.bd.findKing(color).position, !color);
                })
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
    }
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

  private getMoveEmultorData(prevTile: Tile, newPos: Position): MoveEmulatorData {
   return {
     newPos,
     prevPos: prevTile.holder.position,
     color: prevTile.holder.color,
     args: [prevTile.holder.color]
   };
  }
}
