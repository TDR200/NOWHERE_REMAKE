import Phaser from "phaser";
import type { EnemyDefinition, GridMap, GridPosition, MapObjectDefinition } from "./GridMap";
import { gridToScreen, type IsoOrigin } from "./IsoProjection";

const COLORS = {
  forest: { floor: 0x263c32, shadow: 0x14211e, wall: 0x17221e, accent: 0x49604a },
  cafe: { floor: 0x3d3932, shadow: 0x212625, wall: 0x252b29, accent: 0x987b59 }
};

type ActorKind = "player" | "enemy";

export class WorldRenderer {
  private readonly origin: IsoOrigin = { x: 480, y: 92 };
  private readonly actors = new Map<string, Phaser.GameObjects.Graphics>();
  private readonly labels = new Map<string, Phaser.GameObjects.Text>();

  constructor(private readonly scene: Phaser.Scene, private readonly map: GridMap) {
    this.drawTerrain();
    this.drawObjects(map.definition.objects);
    this.drawEnemies(map.definition.enemies);
  }

  createPlayer(position: GridPosition): void {
    this.drawActor("player", "player", position);
  }

  moveActor(id: string, position: GridPosition): void {
    const actor = this.actors.get(id);
    if (!actor) return;
    const point = gridToScreen(position.x, position.y, this.origin);
    actor.setPosition(point.x, point.y).setDepth(point.y + 2);
  }

  showObjectLabel(objectId?: string): void {
    this.labels.forEach((label, id) => label.setVisible(id === objectId));
  }

  dispose(): void {
    this.actors.forEach(actor => actor.destroy());
    this.labels.forEach(label => label.destroy());
    this.actors.clear();
    this.labels.clear();
  }

  private drawTerrain(): void {
    const palette = COLORS[this.map.definition.tone];
    for (let y = 0; y < this.map.definition.height; y++) {
      for (let x = 0; x < this.map.definition.width; x++) {
        const terrain = this.map.terrainAt(x, y);
        const point = gridToScreen(x, y, this.origin);
        const tile = this.scene.add.graphics().setPosition(point.x, point.y).setDepth(point.y);
        const fill = terrain === "wall" ? palette.wall
          : terrain === "shadow" ? palette.shadow
            : terrain === "metal" ? 0x596266
              : terrain === "water" ? 0x31525a
                : palette.floor;
        tile.fillStyle(fill, 1);
        tile.lineStyle(1, 0xb7c0b0, 0.11);
        tile.beginPath();
        tile.moveTo(0, -16);
        tile.lineTo(32, 0);
        tile.lineTo(0, 16);
        tile.lineTo(-32, 0);
        tile.closePath();
        tile.fillPath();
        tile.strokePath();

        if (terrain === "wall") {
          tile.fillStyle(palette.accent, 0.92);
          tile.fillPoints([
            { x: -20, y: -17 }, { x: 0, y: -28 }, { x: 20, y: -17 }, { x: 0, y: -6 }
          ], true);
          tile.fillStyle(palette.wall, 1);
          tile.fillPoints([
            { x: -20, y: -17 }, { x: 0, y: -6 }, { x: 0, y: 9 }, { x: -20, y: -2 }
          ], true);
          tile.fillStyle(0x0c1210, 1);
          tile.fillPoints([
            { x: 0, y: -6 }, { x: 20, y: -17 }, { x: 20, y: -2 }, { x: 0, y: 9 }
          ], true);
        }
      }
    }
  }

  private drawObjects(objects: MapObjectDefinition[]): void {
    objects.forEach(object => {
      const point = gridToScreen(object.x, object.y, this.origin);
      const prop = this.scene.add.graphics().setPosition(point.x, point.y).setDepth(point.y + 1);
      prop.fillStyle(0xd5bd8d, 0.18);
      prop.fillEllipse(0, -4, 34, 16);
      prop.fillStyle(0xd8c79e, 1);
      prop.fillCircle(0, -19, 5);
      prop.lineStyle(2, 0xe1d1a8, 0.8);
      prop.strokeCircle(0, -19, 10);
      const label = this.scene.add.text(point.x, point.y - 45, object.label, {
        fontFamily: "Georgia, serif", fontSize: "12px", color: "#e4d8bd",
        backgroundColor: "#101614cc", padding: { x: 5, y: 3 }
      }).setOrigin(0.5, 1).setDepth(point.y + 20).setVisible(false);
      this.labels.set(object.id, label);
    });
  }

  private drawEnemies(enemies: EnemyDefinition[]): void {
    enemies.forEach(enemy => this.drawActor(enemy.id, "enemy", enemy));
  }

  private drawActor(id: string, kind: ActorKind, position: GridPosition): void {
    const point = gridToScreen(position.x, position.y, this.origin);
    const actor = this.scene.add.graphics().setPosition(point.x, point.y).setDepth(point.y + 2);
    actor.fillStyle(0x000000, 0.34);
    actor.fillEllipse(0, -2, 25, 9);
    actor.fillStyle(kind === "player" ? 0xb9b9a7 : 0x925c55);
    actor.fillPoints([
      { x: -10, y: -8 }, { x: -8, y: -31 }, { x: 0, y: -39 },
      { x: 9, y: -31 }, { x: 10, y: -8 }
    ], true);
    actor.fillStyle(kind === "player" ? 0x343a39 : 0x30282a);
    actor.fillCircle(-1, -40, 7);
    this.actors.set(id, actor);
  }
}