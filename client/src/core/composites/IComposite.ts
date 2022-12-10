export default interface IComposite {
  add(child: IComposite): void;

  remove(child: IComposite): void;

  action(...params: unknown[]): void;
}
