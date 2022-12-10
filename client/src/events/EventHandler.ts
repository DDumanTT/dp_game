import IEventHandler from './IEventHandler';

export default abstract class EventHandler implements IEventHandler {
  protected nextHandler: IEventHandler | null = null;

  setNextHandler(handler: IEventHandler): IEventHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(event: string): string | null {
    if (this.nextHandler) {
      this.nextHandler.handle(event);
    }
    return null
  }
}