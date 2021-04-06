import {Pawn} from '../models/figures/pawn';
import {King} from '../models/figures/king';
import {Queen} from '../models/figures/queen';
import {Bishop} from '../models/figures/bishop';
import {Knight} from '../models/figures/knight';
import {Rook} from '../models/figures/rook';
import {AbstractFigure} from '../models/abstract-figure';

export class FList {
  static $ = {
    b : Bishop,
    K : King,
    k : Knight,
    p : Pawn,
    q : Queen,
    r : Rook
  };
  static strFiguresRep: string = 'rkbKqbkr';
}
