export type TerrainKind = "floor" | "shadow" | "wall" | "water" | "metal";

export interface GridPosition {
  x: number;
  y: number;
}

export interface MapObjectDefinition extends GridPosition {
  id: string;
  label: string;
  dialogue?: string;
  setFlag?: string;
  requiresFlag?: string;
  nextScene?: string;
}

export interface EnemyDefinition extends GridPosition {
  id: string;
  name: string;
}

export interface MapDefinition {
  id: string;
  title: string;
  place: string;
  tone: "forest" | "cafe";
  width: number;
  height: number;
  spawn: GridPosition;
  tiles: string[];
  objects: MapObjectDefinition[];
  enemies: EnemyDefinition[];
}

const TERRAIN: Record<string, TerrainKind> = {
  ".": "floor",
  "s": "shadow",
  "#": "wall",
  "w": "water",
  "m": "metal"
};

export class GridMap {
  constructor(readonly definition: MapDefinition) {
    if (definition.tiles.length !== definition.height) {
      throw new Error(`Map ${definition.id} has an invalid row count`);
    }
    for (const row of definition.tiles) {
      if (row.length !== definition.width) {
        throw new Error(`Map ${definition.id} has a row with invalid width`);
      }
    }
  }

  terrainAt(x: number, y: number): TerrainKind {
    if (x < 0 || y < 0 || x >= this.definition.width || y >= this.definition.height) {
      return "wall";
    }
    return TERRAIN[this.definition.tiles[y][x]] ?? "floor";
  }

  canEnter(x: number, y: number): boolean {
    return this.terrainAt(x, y) !== "wall";
  }
}