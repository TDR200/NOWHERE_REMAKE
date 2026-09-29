const SAVE_KEY = "nowhere_iso_v1";

export interface SaveData {
  flags: string[];
}

export class SaveSystem {
  load(): SaveData {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return { flags: [] };
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed === "object" && parsed !== null && "flags" in parsed && Array.isArray(parsed.flags)) {
        return { flags: parsed.flags.filter((flag): flag is string => typeof flag === "string") };
      }
    } catch {
      return { flags: [] };
    }
    return { flags: [] };
  }

  save(data: SaveData): void {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch {
      // Private browsing or disabled storage should not stop a play session.
    }
  }
}