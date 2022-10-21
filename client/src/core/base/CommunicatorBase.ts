import IAutoService from "../interfaces/IAutoService";
import IGameManager from "../interfaces/IGameManager";

export default abstract class CommunicatorBase implements IAutoService {
  protected uri: string;
  protected name: string;
  protected gameManager: IGameManager = null!;

  constructor(uri: string, name: string) {
    this.uri = uri;
    this.name = name;
  }
  abstract execute(gameManager: IGameManager): void;
}
