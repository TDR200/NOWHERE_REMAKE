import Phaser from "phaser";

export class Lighting {
  private readonly veil: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, alpha = 0.18) {
    this.veil = scene.add.rectangle(480, 320, 960, 640, 0x08100f, alpha)
      .setScrollFactor(0)
      .setDepth(900);
  }

  setIntensity(alpha: number): void {
    this.veil.setAlpha(Phaser.Math.Clamp(alpha, 0, 0.65));
  }
}