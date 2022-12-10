import EventHandler from './EventHandler';

export default class TapEventHandler extends EventHandler {
  public handle(request: string): string | null {
    if (request === 'tap') {
      return 'tap'
    }
    return super.handle(request);
  }
}