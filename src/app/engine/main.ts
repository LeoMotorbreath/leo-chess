import {Board} from '../models/board';
import {AbstractFigure} from '../models/abstract-figure';
import {MoveData, MoveEmulatorData} from '../models/moveData';

const fvalues = {

};
type WLead = -1 | 0 | 1;

interface PScore {
  whoLead: WLead;
  value: number;
}

type EngineCallbackArg = {
  figures: AbstractFigure[];
  pscore: PScore;
  depth: number;
  chain?: MoveEmulatorData[];
};

interface IEngine {
  getMove(color: boolean);
  getPositionScore(figures: AbstractFigure[]): PScore;
}

export class Engine implements IEngine {
  depth = 1;
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  getMove(color: boolean) {
    console.log(this.board.getAllPPMovesMED(color).map((med) => {
      return this.board.emulateMove(med, () => this.getPositionScore(this.patchFiguresTile(this.board.figures)))
    }))
  } 

  getPositionScore(figures: AbstractFigure[]): PScore {
    
     
    const reduced = figures.reduce((acc, figure) => {
      figure.color ? acc.white.push(figure) : acc.black.push(figure);
      return acc;
      }, {white: [], black: []}
    );
    const diff = this.sumValues(reduced.white) - this.sumValues(reduced.black);
  
    return {
      whoLead: this.getWhoLead(diff),
      value: Math.abs(diff)
    };
  }

  private sumValues(fs: AbstractFigure[]) {
    return fs.reduce((acc, f) => acc + f.engineValue, 0);
  }

  private getWhoLead(diff: number): WLead {
    return diff === 0 ? 0 : (diff > 0 ? 1 : -1);
  }

  //have to save figures state and calculte positions
  private emulatorCallback(arg: EngineCallbackArg) {
    if (arg.depth === 0) {
      return arg.chain;
    } else {
      arg.depth--;
    }
    // return this.getPositionScore(updatedFigures); 
  }

  private emulatorInner(med: MoveEmulatorData) {
    
  }

  cloneFigures(figures: AbstractFigure[]): AbstractFigure[] {
    const hash = this.board.getFieldClone().reduce((hash, value) => {
      hash[value.id] = value;
      return hash;
    });

    return figures.map(figure => ({...figure, tile: hash[figure.tile.id]}));
  }
}
 