import type { MapObjectDefinition } from "../world/GridMap";
import type { StoryFlags } from "../story/flags";

export interface InteractionHandlers {
  onDialogue(key: string): void;
  onNotice(message: string): void;
  onTransition(sceneKey: string): void;
}

export class InteractionSystem {
  constructor(
    private readonly objects: MapObjectDefinition[],
    private readonly flags: StoryFlags,
    private readonly handlers: InteractionHandlers
  ) {}

  interact(position: { x: number; y: number }): void {
    const target = this.objects
      .filter(object => Math.abs(object.x - position.x) + Math.abs(object.y - position.y) <= 1)
      .sort((a, b) => this.distance(a, position) - this.distance(b, position))[0];

    if (!target) {
      this.handlers.onNotice("Здесь нечего осматривать.");
      return;
    }
    if (target.requiresFlag && !this.flags.has(target.requiresFlag)) {
      this.handlers.onNotice("Пока нельзя пройти дальше.");
      return;
    }
    if (target.setFlag) this.flags.set(target.setFlag);
    if (target.dialogue) this.handlers.onDialogue(target.dialogue);
    if (target.nextScene) this.handlers.onTransition(target.nextScene);
  }

  nearbyId(position: { x: number; y: number }): string | undefined {
    return this.objects.find(object => this.distance(object, position) <= 1)?.id;
  }

  private distance(object: MapObjectDefinition, position: { x: number; y: number }): number {
    return Math.abs(object.x - position.x) + Math.abs(object.y - position.y);
  }
}