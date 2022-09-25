import GameDependencies from "./GameDependencies";
import IGameManager from "./interfaces/IGameManager";

export default class GameManager extends GameDependencies implements IGameManager {
    public getService<T>(type: { new(...args: any[]): T }): T | undefined {
        return this.services.find(x => x instanceof type) as T;
    }
}