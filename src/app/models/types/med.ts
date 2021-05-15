import {Position} from './position';

export type MoveData = {
  newPos: Position;
  prevPos: Position;
  color: boolean;
}

export interface MoveEmulatorData extends MoveData {
  args?: any[];
}
