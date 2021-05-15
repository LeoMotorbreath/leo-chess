import { MoveEmulatorData } from "../types/med";
import { Rows } from "../types/row";

export interface IMoveEmulator {
    emulateMove(moveEmulatorDate: MoveEmulatorData, callBack: (arg: any) => unknown, row?: Rows);
}