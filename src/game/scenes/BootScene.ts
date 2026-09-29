import Phaser from "phaser";
import { ASSET_MANIFEST } from "../data/assets";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload(): void {
    for (const asset of ASSET_MANIFEST) {
      if (asset.type === "image") this.load.image(asset.key, asset.path);
      if (asset.type === "audio") this.load.audio(asset.key, asset.path);
      if (asset.type === "spritesheet" && asset.frameWidth && asset.frameHeight) {
        this.load.spritesheet(asset.key, asset.path, {
          frameWidth: asset.frameWidth,
          frameHeight: asset.frameHeight
        });
      }
    }
  }

  create(): void {
    this.scene.start("MenuScene");
  }
}