import { Application } from "pixi.js";
import ILevel from "./ILevel";

export default interface ILevelPicker {
  setLevel(level: ILevel): void;
  loadLevel(app: Application): void;
}
