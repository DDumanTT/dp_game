import "./extensions/NumberExtensions";
import { GameFacade } from "./core/facade/GameFacade";
import { NameFilter, NamesProxy } from "./core/proxy/NamesProxy";

const input = document.getElementById("name") as HTMLInputElement;
const colorInput = document.getElementById("color") as HTMLInputElement;
colorInput.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
document.getElementById("play")?.addEventListener("click", () => {
  const name = input?.value;
  if (!name) {
    alert("Please input a name");

    return;
  }
  const customProxy = new NamesProxy(new NameFilter());
  const newName = customProxy.formatName(name);

  if (newName === null) {
    return;
  }

  const color = Number(`0x${colorInput.value.substring(1)}`);
  GameFacade.StartGame(newName, color);
});
