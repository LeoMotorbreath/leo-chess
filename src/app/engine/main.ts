import {Board, MoveData} from '../models/board';
import {AbstractFigure} from '../models/abstract-figure';
import {Tile} from '../models/tile';
import {getMoveEmulatorDataTemp, MoveEmulatorData} from '../models/moveData';

const fvalues = {

};
type WLead = -1 | 0 | 1;

interface PScore {
  whoLead: WLead;
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

  getMove(color) {
    const fss = this.board.getFiguresArray(color);
    let x = fss
      .map((figure): MoveEmulatorData[] => {
          return this.board.filterPseudoPossibleMove(figure.tile, figure.findPseudoLegalMoves())
            .map((tile) => (
                  {
                    ...getMoveEmulatorDataTemp(figure.tile, tile.position),
                    args: [fss]
                  }
                )
            );
      })
      .reduce((acc, value) => acc.concat(value), [])
      .map((med) => (
          {
            ...med,
            value: this.board.emulateMove(med, ((fss: AbstractFigure[]) => this.sumValues(fss))),
          }
        )
    );
    console.log(x)
    return x
  }

  getPositionScore(): PScore {
    const diff = this.sumValues(this.board.getFiguresArray(true)) - this.sumValues(this.board.getFiguresArray(false));
    const whoLead = diff === 0 ? 0 : diff > 0 ? 1 : -1;
    return {
      whoLead,
      value: Math.abs(diff)
    };
  }

  private sumValues(fs: AbstractFigure[]) {
    return fs.reduce((acc, f) => acc + f.engineValue, 0);
  }
}
