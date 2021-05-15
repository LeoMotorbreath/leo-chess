import { IMoveEmulator } from "../intrefaces/move-emulator";
import { MoveEmulatorData } from "../types/med";
import { Rows } from "../types/row";
import { Board } from "./board";

export class MoveEmulator implements IMoveEmulator {

    private board: Board = new Board();
    
    emulateMove(moveEmulatorDate: MoveEmulatorData, callBack: (arg: any) => unknown, rows: Rows,) {
        const newTile = this.board.getTileByPosition(moveEmulatorDate.newPos, rows);
        const prevTile = this.board.getTileByPosition(moveEmulatorDate.prevPos, rows);
        const prevTileFigure = prevTile.holder;
        const newTileFigure = newTile.holder;
        this.board.removeFigure(newTileFigure);
        prevTile.holder = null;
        newTile.holder = prevTileFigure;
        const result = callBack(...moveEmulatorDate.args);
        prevTile.holder = prevTileFigure;
        newTile.holder = null;
        this.board.placeFigure(newTileFigure);
        return result;
    }

}