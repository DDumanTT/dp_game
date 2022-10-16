export default interface IObserver<T> {
  update(value: T): void;
}
