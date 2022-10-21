import { Application, IApplicationOptions } from "pixi.js";
import RendererBase from "../../core/base/RendererBase";

export default class PixiRenderer extends RendererBase {
  private _app: Application;
  public get app(): Application {
    return this._app;
  }

  public constructor(options: IApplicationOptions, fps: number) {
    super(fps);
    this._app = new Application({
      resizeTo: window,
      ...options,
    });
  }

  execute(): void {
    document.body.appendChild(this._app.view);
  }
}
