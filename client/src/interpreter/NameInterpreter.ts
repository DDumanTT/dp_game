import INameInterpreter from "./INameInterpreter";

export default class NameInterpreter implements INameInterpreter {
  private numbers: number[] = [];
  private strings: string[] = [];

  interpret(expression: string): string {
    const tokens = this.tokenize(expression);
    const number = this.evaluate(tokens, tokens.length - 1);
    return `${this.strings.join(" ")} ${number}`;
  }

  private tokenize(expression: string): string[] {
    // Split the expression into individual tokens.
    return expression.split(" ");
  }

  private evaluate(tokens: string[], currentToken: number): number {
    // Get the current token and move to the next one.
    const token = tokens[currentToken--].trim();

    if (currentToken < 0) {
      if (isNaN(Number(token))) {
        this.strings.push(token);
        return 0;
      } else {
        return Number(token);
      }
    }

    // If the token is an operator, evaluate the expression that follows.
    if (token === "+") {
      const prevNum = this.numbers.shift() || 0;
      return prevNum + this.evaluate(tokens, currentToken);
    } else if (token === "-") {
      const prevNum = this.numbers.shift() || 0;
      return prevNum - this.evaluate(tokens, currentToken);
    } else if (token === "*") {
      const prevNum = this.numbers.shift() || 0;
      return prevNum * this.evaluate(tokens, currentToken);
    } else if (token === "/") {
      const prevNum = this.numbers.shift() || 0;
      return prevNum / this.evaluate(tokens, currentToken);
    }

    // If the token is a number, return it as a value.
    if (isNaN(Number(token))) {
      this.strings.push(token);
      return this.evaluate(tokens, currentToken);
    } else {
      this.numbers.push(Number(token));
    }

    return this.evaluate(tokens, currentToken);
  }
}
