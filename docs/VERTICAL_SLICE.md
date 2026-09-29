# Vertical Slice

The current playable slice contains the menu, the forest-road map and the cafe. It demonstrates data-driven scene setup, grid movement, nearby interaction, persistent story flags, dialogue lookup, enemy detection, shadow stealth and screen-Y depth sorting.

## Controls

- `WASD` or arrow keys: move one grid cell.
- `E`: interact with an adjacent object or continue dialogue.
- `Enter` or `Space`: continue dialogue.

## Run

Install dependencies with `npm install`, launch `npm run dev`, and use `npm run build` for a production build. Maps and dialogue belong in data modules; rendering code must not own story flags or scene content.
