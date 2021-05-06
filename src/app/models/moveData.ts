import {Position} from './position';
import {Tile} from './tile';

export interface MoveData {
  newPos: Position;
  prevPos: Position;
  color: boolean;
}

export interface MoveEmulatorData extends MoveData {
  args?: any[];
}

export function getMoveEmulatorDataTemp(prevTile: Tile, newPos: Position): MoveEmulatorData {
  return {
    newPos,
    prevPos: prevTile.holder.position,
    color: prevTile.holder.color,
    args: [prevTile.holder.color]
  };
}
