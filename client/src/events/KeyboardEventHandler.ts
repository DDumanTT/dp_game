import EventHandler from './EventHandler';

export default class KeyboardEventHandler extends EventHandler {
  public handle(request: string): string | null {
    if (request === 'keyboard') {
      return 'keyboard'
    }
    return super.handle(request);
  }
}
