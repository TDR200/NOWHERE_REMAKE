import Phaser from "phaser";
import type { MapDefinition, GridPosition } from "../world/GridMap";
import { GridMap } from "../world/GridMap";
import { Lighting } from "../world/Lighting";
import { WorldRenderer } from "../world/WorldRenderer";
import { EnemySystem } from "../systems/EnemySystem";
import { InteractionSystem } from "../systems/InteractionSystem";
import { MovementSystem } from "../systems/MovementSystem";
import { SaveSystem } from "../systems/SaveSystem";
import { StealthSystem } from "../systems/StealthSystem";
import { StoryFlags } from "../story/flags";
import { DIALOGUE } from "../story/dialogue";

const DIRECTIONS: Record<string, GridPosition> = {
  ArrowUp: { x: 0, y: -1 }, KeyW: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 }, KeyS: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 }, KeyA: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }, KeyD: { x: 1, y: 0 }
};

export abstract class GridScene extends Phaser.Scene {
  private player!: GridPosition;
  private map!: GridMap;
  private renderer!: WorldRenderer;
  private movement!: MovementSystem;
  private interactions!: InteractionSystem;
  private enemies!: EnemySystem;
  private flags!: StoryFlags;
  private lighting!: Lighting;
  private status!: Phaser.GameObjects.Text;
  private dialoguePanel!: Phaser.GameObjects.Container;
  private dialogueLines: string[] = [];
  private dialogueIndex = 0;
  private pendingSceneKey?: string;
  private noticeUntil = 0;

  protected constructor(key: string, private readonly definition: MapDefinition) {
    super(key);
  }

  create(): void {
    this.map = new GridMap(this.definition);
    this.player = { ...this.definition.spawn };
    this.flags = new StoryFlags(new SaveSystem());
    this.movement = new MovementSystem(this.map);
    const stealth = new StealthSystem(this.map);
    this.enemies = new EnemySystem(this.map, stealth);
    this.renderer = new WorldRenderer(this, this.map);
    this.renderer.createPlayer(this.player);
    this.lighting = new Lighting(this, this.definition.tone === "forest" ? 0.22 : 0.08);
    this.createHud();
    this.interactions = new InteractionSystem(this.definition.objects, this.flags, {
      onDialogue: key => this.showDialogue(key),
      onNotice: message => this.showNotice(message),
      onTransition: sceneKey => {
        if (this.dialogueLines.length) this.pendingSceneKey = sceneKey;
        else this.scene.start(sceneKey);
      }
    });

    this.input.keyboard?.on("keydown", this.handleKey, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);

    if (this.definition.id === "forest-road" && !this.flags.has("forest_intro_seen")) {
      this.flags.set("forest_intro_seen");
      this.showDialogue("forestIntro");
    }
  }

  update(_time: number, delta: number): void {
    if (this.enemies.update(delta, this.player, this.definition.enemies)) {
      this.showNotice(this.map.terrainAt(this.player.x, this.player.y) === "shadow"
        ? "Шаги приближаются, но тень скрывает вас."
        : "Вы слышите движение в темноте.");
      for (const enemy of this.definition.enemies) {
        this.renderer.moveActor(enemy.id, enemy);
      }
    }
    const nearby = this.interactions.nearbyId(this.player);
    this.renderer.showObjectLabel(nearby);
    this.status.setText(nearby ? `E  ·  ${this.definition.objects.find(object => object.id === nearby)?.label ?? "осмотреть"}` : "WASD / стрелки · E — действие");
    if (this.time.now > this.noticeUntil && !this.dialogueLines.length) {
      this.status.setColor(nearby ? "#e3cf9c" : "#9ba49d");
    }
  }

  private createHud(): void {
    this.add.text(25, 20, this.definition.title, {
      fontFamily: "Georgia, serif", fontSize: "17px", color: "#e5ded2"
    }).setScrollFactor(0).setDepth(950);
    this.add.text(25, 45, this.definition.place, {
      fontFamily: "Georgia, serif", fontSize: "13px", color: "#aab4ac"
    }).setScrollFactor(0).setDepth(950);
    this.status = this.add.text(25, 596, "WASD / стрелки · E — действие", {
      fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#9ba49d",
      backgroundColor: "#101614dd", padding: { x: 10, y: 7 }
    }).setScrollFactor(0).setDepth(950);
    const panel = this.add.rectangle(480, 618, 960, 44, 0x0b100f, 0.84).setScrollFactor(0).setDepth(940);
    this.dialoguePanel = this.add.container(0, 0, [panel]).setDepth(960).setVisible(false);
  }

  private handleKey(event: KeyboardEvent): void {
    if (event.code.startsWith("Arrow") || event.code === "Space") event.preventDefault();
    if (this.dialogueLines.length) {
      if (event.code === "Enter" || event.code === "Space" || event.code === "KeyE") this.advanceDialogue();
      return;
    }
    if (event.code === "KeyE") {
      this.interactions.interact(this.player);
      return;
    }
    const direction = DIRECTIONS[event.code];
    if (!direction) return;
    const next = this.movement.move(this.player, direction.x, direction.y);
    if (!next) return;
    this.player = next;
    this.renderer.moveActor("player", this.player);
    this.lighting.setIntensity(this.map.terrainAt(next.x, next.y) === "shadow" ? 0.12 : 0.22);
  }

  private showDialogue(key: string): void {
    this.dialogueLines = DIALOGUE[key] ?? ["..." ];
    this.dialogueIndex = 0;
    this.dialoguePanel.removeAll(true);
    this.dialoguePanel.add(this.add.rectangle(480, 558, 860, 116, 0x111816, 0.96)
      .setStrokeStyle(1, 0x777b68, 0.8).setScrollFactor(0));
    this.dialoguePanel.add(this.add.text(76, 525, this.dialogueLines[0], {
      fontFamily: "Georgia, serif", fontSize: "18px", color: "#e8e2d4",
      wordWrap: { width: 780 }, lineSpacing: 8
    }).setScrollFactor(0));
    this.dialoguePanel.add(this.add.text(838, 603, "ENTER / E  →", {
      fontFamily: "Arial, sans-serif", fontSize: "12px", color: "#aeb5a9"
    }).setOrigin(1, 0).setScrollFactor(0));
    this.dialoguePanel.setVisible(true);
  }

  private advanceDialogue(): void {
    this.dialogueIndex++;
    if (this.dialogueIndex >= this.dialogueLines.length) {
      this.dialogueLines = [];
      this.dialoguePanel.setVisible(false);
      if (this.pendingSceneKey) {
        const sceneKey = this.pendingSceneKey;
        this.pendingSceneKey = undefined;
        this.scene.start(sceneKey);
      }
      return;
    }
    const line = this.dialogueLines[this.dialogueIndex];
    const text = this.dialoguePanel.list.find(child => child instanceof Phaser.GameObjects.Text) as Phaser.GameObjects.Text | undefined;
    text?.setText(line);
  }

  private showNotice(message: string): void {
    this.noticeUntil = this.time.now + 2400;
    this.status.setText(message).setColor("#e3cf9c");
  }

  private shutdown(): void {
    this.input.keyboard?.off("keydown", this.handleKey, this);
    this.renderer.dispose();
  }
}