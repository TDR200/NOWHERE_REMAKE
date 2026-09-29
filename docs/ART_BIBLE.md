# Art Bible

## Projection and scale

- One floor cell is 64 × 32 px.
- The grid remains authoritative; isometric coordinates are presentation only.
- Project with `screenX = originX + (gridX - gridY) * 32` and `screenY = originY + (gridX + gridY) * 16`.
- Character anchors sit at the feet. Prop anchors sit at their base.
- Sort ground-level objects by projected base `screenY`; tall art may extend upward without changing its anchor.

## Visual direction

Use restrained, low-saturation greens and mineral grays for the forest, with warm wood and paper accents inside the cafe. Keep silhouettes readable against the floor. Shadows are playable terrain and should remain visually distinct from walls.
