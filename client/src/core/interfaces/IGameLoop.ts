export default interface IGameLoop {
  start(): void;
  update(delta: number): void;
}
