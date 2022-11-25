export default interface IEnumerator<T> {
    moveNext(): boolean;
    current?: T;
}