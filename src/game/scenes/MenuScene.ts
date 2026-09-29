import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#111716");
    this.add.text(62, 67, "NOWHERE", {
      fontFamily: "Georgia, serif", fontSize: "42px", color: "#e5e0d2"
    });
    this.add.text(66, 122, "ACT II · JOHN     /     ДОМ И ЛЕСНАЯ ДОРОГА", {
      fontFamily: "Georgia, serif", fontSize: "14px", color: "#98a29b"
    });

    const start = this.add.text(66, 520, "НАЧАТЬ  →", {
      fontFamily: "Georgia, serif", fontSize: "18px", color: "#dfc78f",
      backgroundColor: "#222b27", padding: { x: 14, y: 10 }
    }).setInteractive({ useHandCursor: true });
    start.on("pointerover", () => start.setColor("#fff0c7"));
    start.on("pointerout", () => start.setColor("#dfc78f"));
    start.on("pointerdown", () => this.scene.start("ForestRoadScene"));

    this.add.text(66, 570, "WASD / стрелки — движение     E — осмотреть", {
      fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#818d86"
    });
  }
}