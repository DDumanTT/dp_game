import IEnumerator from "./IEnumerator";

export default interface IEnumerable<T> {
    getEnumerator(): IEnumerator<T>
}