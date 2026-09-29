import { SaveSystem } from "../systems/SaveSystem";

export class StoryFlags {
  private readonly values: Set<string>;

  constructor(private readonly saveSystem = new SaveSystem()) {
    this.values = new Set(saveSystem.load().flags);
  }

  has(flag: string): boolean {
    return this.values.has(flag);
  }

  set(flag: string): void {
    this.values.add(flag);
    this.saveSystem.save({ flags: [...this.values] });
  }

  all(): string[] {
    return [...this.values];
  }
}