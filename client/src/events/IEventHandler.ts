export default interface IEventHandler {
  setNextHandler(handler: IEventHandler): IEventHandler;
  handle(event: string): string | null;
}