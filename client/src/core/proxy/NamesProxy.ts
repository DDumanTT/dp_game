/**
 * The Subject interface declares common operations for both RealSubject and the
 * Proxy. As long as the client works with RealSubject using this interface,
 * you'll be able to pass it a proxy instead of a real subject.
 */
interface Filter {
    formatName(name:string): string|null;
}

/**
 * The RealSubject contains some core business logic. Usually, RealSubjects are
 * capable of doing some useful work which may also be very slow or sensitive -
 * e.g. correcting input data. A Proxy can solve these issues without any
 * changes to the RealSubject's code.
 */
class NameFilter implements Filter {
    public formatName(name:string): string|null {
        console.log('RealSubject: Handling request.');
        // Use a regular expression to remove any characters that are not letters, numbers, or underscores
        name = name.replace(/[^\w]/g, '');

          // Use the trim() method to remove leading and trailing whitespace
        name = name.trim();

        // Use the toLowerCase() method to convert the username to lowercase
        name = name.toLowerCase();

        return name;
    }
}

/**
 * The Proxy has an interface identical to the RealSubject.
 */
class NamesProxy implements Filter {
    private nameFilter: NameFilter;

    /**
     * The Proxy maintains a reference to an object of the RealSubject class. It
     * can be either lazy-loaded or passed to the Proxy by the client.
     */
    constructor(realSubject: NameFilter) {
        this.nameFilter = realSubject;
    }

    /**
     * The most common applications of the Proxy pattern are lazy loading,
     * caching, controlling the access, logging, etc. A Proxy can perform one of
     * these things and then, depending on the result, pass the execution to the
     * same method in a linked RealSubject object.
     */
    public formatName(name: string): string|null {
        if (this.nameIsValid(name)) {
            return this.nameFilter.formatName(name);
        } else {
            alert(`Username ${name} is invalid`);
            return null;
        }
    }

    private nameIsValid(name:string): boolean {
        const invalidNames = ['nigger', 'nagger', 'cunt', 'faggot', 'idiot'];
        // Some real checks should go here.
        if(invalidNames.includes(name)){
            return false;
        }
        return true;
    }

    generateUsername() {
        // Generate a random number between 1 and 100
        const randomNumber = Math.floor(Math.random() * 100) + 1;
      
        // Generate a random string of characters
        const randomString = Math.random().toString(36).substring(2, 15);
      
        // Return the random number and string combined to form the username
        return `user${randomNumber}${randomString}`;
      }
}

/**
 * The client code is supposed to work with all objects (both subjects and
 * proxies) via the Subject interface in order to support both real subjects and
 * proxies. In real life, however, clients mostly work with their real subjects
 * directly. In this case, to implement the pattern more easily, you can extend
 * your proxy from the real subject's class.
 */
// function clientCode(subject: Subject) {
//     // ...

//     subject.request();

//     // ...
// }

// console.log('Client: Executing the client code with a real subject:');
// const realSubject = new RealSubject();
// clientCode(realSubject);

// console.log('');

// console.log('Client: Executing the same client code with a proxy:');
// const proxy = new Proxy(realSubject);
// clientCode(proxy);