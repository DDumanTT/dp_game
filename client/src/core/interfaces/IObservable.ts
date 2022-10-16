import IObserver from "../interfaces/IObserver";

export default interface IObservable<T> {
  addObserver(observer: IObserver<T>): void;
  removeObserver(observer: IObserver<T>): void;
  notifyObservers(value: T): void;
}
