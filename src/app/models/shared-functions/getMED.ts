export function getMoveEmulatorDataTemp(prevTile: Tile, newPos: Position): MoveEmulatorData {
    return {
      newPos,
      prevPos: prevTile.holder.position,
      color: prevTile.holder.color,
      args: [prevTile.holder.color]
    };
  }