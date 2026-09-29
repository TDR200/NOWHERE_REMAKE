export interface AssetEntry {
  key: string;
  path: string;
  type: "image" | "spritesheet" | "audio";
  frameWidth?: number;
  frameHeight?: number;
}

export const ASSET_MANIFEST: AssetEntry[] = [];