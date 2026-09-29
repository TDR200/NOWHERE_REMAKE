import mapData from "../data/maps/forest-road.json";
import type { MapDefinition } from "../world/GridMap";
import { GridScene } from "./GridScene";

export class ForestRoadScene extends GridScene {
  constructor() {
    super("ForestRoadScene", mapData as MapDefinition);
  }
}