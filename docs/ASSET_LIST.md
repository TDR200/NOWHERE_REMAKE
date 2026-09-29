# Asset List

The vertical slice currently uses Phaser Graphics so it runs without external art. Add final files under `public/assets/` and register them in `src/game/data/assets.ts`; `BootScene` loads that manifest and `npm run validate:assets` checks every registered path.

| Area | Planned content |
| --- | --- |
| `environment/forest/ground` | floor, shadow, wet earth tiles |
| `environment/forest/trees` | tree trunk and canopy sprite sheets |
| `environment/forest/props` | diary, road debris, interactable markers |
| `environment/road` | road segments and damaged vehicle |
| `environment/cafe` | counter, tables, restroom door, props |
| `characters/john` | idle and walk cycles |
| `characters/sophia` | idle and talk cycles |
| `characters/creatures` | forest creature animation |
| `effects` | fog, impact, lighting overlays |
| `ui` | dialogue frame and interaction prompt |
| `audio` | ambience, footsteps, dialogue and effects |
