import { Application } from "pixi.js";

export default interface IGameManager {
  app: Application;
  getService<T>(type: { new (...args: any[]): T }): T;
}
