import IAutoService from "../interfaces/IAutoService";

export default abstract class RendererBase implements IAutoService {
  protected _fps: number;

  protected constructor(fps: number) {
    this._fps = fps;
  }
  abstract execute(): void;
}
