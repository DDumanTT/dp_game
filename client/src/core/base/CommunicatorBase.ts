import IAutoService from "../interfaces/IAutoService";
import IGameManager from "../interfaces/IGameManager";

export default abstract class CommunicatorBase implements IAutoService {
  protected uri: string;
  protected name: string;
  protected color: number;
  protected gameManager: IGameManager = null!;

  constructor(uri: string, name: string, color: number) {
    this.uri = uri;
    this.name = name;
    this.color = color;
  }
  abstract execute(gameManager: IGameManager): void;
}
