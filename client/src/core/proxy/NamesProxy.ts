interface Filter {
  formatName(name: string): string | null;
}

export class NameFilter implements Filter {
  public formatName(name: string): string | null {
    console.log("RealSubject: Handling request.");
    // Use a regular expression to remove any characters that are not letters, numbers, or underscores
    name = name.replace(/[^\w]/g, "");

    // Use the trim() method to remove leading and trailing whitespace
    name = name.trim();

    // Use the toLowerCase() method to convert the username to lowercase
    name = name.toLowerCase();

    return name;
  }
}

export class NamesProxy implements Filter {
  private nameFilter: NameFilter;

  constructor(realSubject: NameFilter) {
    this.nameFilter = realSubject;
  }

  public formatName(name: string): string | null {
    if (this.nameIsValid(name)) {
      return this.nameFilter.formatName(name);
    } else {
      alert(`Username ${name} is invalid`);
      return null;
    }
  }

  private nameIsValid(name: string): boolean {
    const invalidNames = ["nigger", "nagger", "cunt", "faggot", "idiot"];
    // Some real checks should go here.
    if (invalidNames.includes(name)) {
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
