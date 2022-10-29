import GameDependencies from "./GameDependencies";
import IGameManager from "./interfaces/IGameManager";

export default class GameManager
  extends GameDependencies
  implements IGameManager
{
  public getService<T>(type: { new (...args: any[]): T }): T {
    const service =
      (this.autoServices.find((x) => x instanceof type) as T) ??
      (this.services.find((x) => x instanceof type) as T);

    if (service == undefined) {
      throw new Error(`Service of type "${type}", does not exist.`);
    }
    return service;
  }
}
