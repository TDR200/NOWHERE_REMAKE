import type { GridMap, GridPosition } from "../world/GridMap";

export class StealthSystem {
  constructor(private readonly map: GridMap) {}

  isHidden(position: GridPosition): boolean {
    return this.map.terrainAt(position.x, position.y) === "shadow";
  }

  detectionRange(position: GridPosition, normalRange: number): number {
    return this.isHidden(position) ? Math.floor(normalRange / 2) : normalRange;
  }
}