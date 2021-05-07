import {Board, MoveData} from '../models/board';
import {AbstractFigure} from '../models/abstract-figure';
import {Tile} from '../models/tile';
import {getMoveEmulatorDataTemp, MoveEmulatorData} from '../models/moveData';

const fvalues = {

};
type WLead = -1 | 0 | 1;

interface PScore {
  whoLead: WLead;
  value: number;
}



interface IEngine {
  getMove(): MoveData;
  getPositionScore(): PScore;
}

export class Engine implements IEngine {
  depth = 1;
  board: Board;
  constructor(board: Board) {
    this.board = board;
  }

  getMove(color: boolean) {
    this.board.getAllPPMovesMED(color);
  }

  getPositionScore(figures?: AbstractFigure[]): PScore {
    let diff;
    if (!figures) {
      diff = this.sumValues(this.board.getFiguresArray(true)) - this.sumValues(this.board.getFiguresArray(false));
    } else {
      const reduced = figures.reduce((acc, figure) => {
        figure.color ? acc.white.push(figure) : acc.black.push(figure);
        return acc;
      }, {white: [], black: []});
      diff = this.sumValues(reduced.white) - this.sumValues(reduced.black);
    }
    const whoLead = diff === 0 ? 0 : diff > 0 ? 1 : -1;
    return {
      whoLead,
      value: Math.abs(diff)
    };
  }

  private sumValues(fs: AbstractFigure[]) {
    return fs.reduce((acc, f) => acc + f.engineValue, 0);
  }


  //have to save figures state and calculte positions
  private emulatorCallback(updatedFigures: AbstractFigure[]) {
    this.getPositionScore(updatedFigures);
  }
}
