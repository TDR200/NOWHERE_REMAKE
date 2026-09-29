import mapData from "../data/maps/cafe.json";
import type { MapDefinition } from "../world/GridMap";
import { GridScene } from "./GridScene";

export class CafeScene extends GridScene {
  constructor() {
    super("CafeScene", mapData as MapDefinition);
  }
}