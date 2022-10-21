import IGameManager from "./IGameManager";

export default interface AutoService {
  execute(gameManager: IGameManager): void;
}
