import EventHandler from './EventHandler';

export default class MouseEventHandler extends EventHandler {
  public handle(request: string): string | null {
    if (request === 'mouse') {
      return 'mouse'
    }
    return super.handle(request);
  }
}