import type { EnemyDefinition, GridMap, GridPosition } from "../world/GridMap";
import { StealthSystem } from "./StealthSystem";

export class EnemySystem {
  private elapsed = 0;

  constructor(
    private readonly map: GridMap,
    private readonly stealth: StealthSystem
  ) {}

  update(delta: number, player: GridPosition, enemies: EnemyDefinition[]): boolean {
    this.elapsed += delta;
    if (this.elapsed < 550) return false;
    this.elapsed = 0;
    let alerted = false;
    const detectionRange = this.stealth.detectionRange(player, 4);

    for (const enemy of enemies) {
      const distance = Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y);
      if (distance > detectionRange) continue;
      alerted = true;
      const dx = Math.sign(player.x - enemy.x);
      const dy = Math.sign(player.y - enemy.y);
      const candidates = Math.abs(player.x - enemy.x) >= Math.abs(player.y - enemy.y)
        ? [{ x: enemy.x + dx, y: enemy.y }, { x: enemy.x, y: enemy.y + dy }]
        : [{ x: enemy.x, y: enemy.y + dy }, { x: enemy.x + dx, y: enemy.y }];
      const next = candidates.find(point =>
        this.map.canEnter(point.x, point.y) &&
        !enemies.some(other => other.id !== enemy.id && other.x === point.x && other.y === point.y) &&
        !(point.x === player.x && point.y === player.y)
      );
      if (next) {
        enemy.x = next.x;
        enemy.y = next.y;
      }
    }
    return alerted;
  }
}