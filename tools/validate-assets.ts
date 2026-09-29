import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { ASSET_MANIFEST } from "../src/game/data/assets";

const missing = ASSET_MANIFEST.filter(asset => !existsSync(resolve("public", asset.path)));

if (missing.length === 0) {
  console.log(`Asset manifest valid: ${ASSET_MANIFEST.length} entries.`);
} else {
  console.error("Missing assets:");
  for (const asset of missing) console.error(`- ${asset.key}: public/${asset.path}`);
  process.exitCode = 1;
}