import "./styles.css";
import { createGame } from "./game/Game";

const mount = document.querySelector<HTMLDivElement>("#app");

if (!mount) {
  throw new Error("Game mount element #app was not found");
}

createGame(mount);