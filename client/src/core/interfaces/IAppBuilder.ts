import IAutoService from "./IAutoService";
import IGameManager from "./IGameManager";

export default interface IGameManagerBuilder {
  addAutoService(service: IAutoService): void;
  build(): IGameManager;
}
