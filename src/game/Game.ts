import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { CafeScene } from "./scenes/CafeScene";
import { ForestRoadScene } from "./scenes/ForestRoadScene";
import { MenuScene } from "./scenes/MenuScene";

export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 960,
    height: 640,
    backgroundColor: "#111716",
    pixelArt: true,
    render: { antialias: false, roundPixels: true },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 960,
      height: 640
    },
    input: { activePointers: 3 },
    scene: [BootScene, MenuScene, ForestRoadScene, CafeScene]
  });
}