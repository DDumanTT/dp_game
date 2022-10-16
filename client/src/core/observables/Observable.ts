import IObserver from "../interfaces/IObserver";
import IObservable from "../interfaces/IObservable";

export default abstract class Observable<T> implements IObservable<T> {
  private observers: IObserver<T>[] = [];

  public addObserver(observer: IObserver<T>) {
    this.observers.push(observer);
  }

  public removeObserver(observer: IObserver<T>) {
    this.observers = this.observers.filter((x) => x != observer);
  }

  public notifyObservers(value: T) {
    for (const observer of this.observers) {
      observer.update(value);
    }
  }
}
