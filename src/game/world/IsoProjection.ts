export interface GridPoint {
  x: number;
  y: number;
}

export interface ScreenPoint {
  x: number;
  y: number;
}

export interface IsoOrigin {
  x: number;
  y: number;
}

export const TILE_WIDTH = 64;
export const TILE_HEIGHT = 32;

export function gridToScreen(
  gridX: number,
  gridY: number,
  origin: IsoOrigin
): ScreenPoint {
  return {
    x: origin.x + (gridX - gridY) * (TILE_WIDTH / 2),
    y: origin.y + (gridX + gridY) * (TILE_HEIGHT / 2)
  };
}

export function screenToGrid(
  screenX: number,
  screenY: number,
  origin: IsoOrigin
): GridPoint {
  const localX = (screenX - origin.x) / (TILE_WIDTH / 2);
  const localY = (screenY - origin.y) / (TILE_HEIGHT / 2);
  return {
    x: Math.round((localX + localY) / 2),
    y: Math.round((localY - localX) / 2)
  };
}