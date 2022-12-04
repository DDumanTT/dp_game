interface IComposite {
    // This method adds a child to the composite
    add(child: IComposite): void;

    // This method removes a child from the composite
    remove(child: IComposite): void;

    // This method performs some action on the composite object
    action(...params: unknown[]): void;
}