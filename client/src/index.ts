import "./extensions/NumberExtensions";
import { GameFacade } from "./core/facade/GameFacade";

const input = document.getElementById("name") as HTMLInputElement;
const colorInput = document.getElementById("color") as HTMLInputElement;
colorInput.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
document.getElementById("play")?.addEventListener("click", () => {
  let name = input?.value;
  if (!name) {
    alert("Please input a name");
    return;
  }

  const color = Number(`0x${colorInput.value.substring(1)}`);
  GameFacade.StartGame(name, color);
});
