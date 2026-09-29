import type { GridMap, GridPosition } from "../world/GridMap";

export class MovementSystem {
  constructor(private readonly map: GridMap) {}

  move(position: GridPosition, dx: number, dy: number): GridPosition | null {
    const next = { x: position.x + dx, y: position.y + dy };
    return this.map.canEnter(next.x, next.y) ? next : null;
  }
}