/*
- This is an abstract class (cannot be instantiated) for all of our error types to inherit from
- enforces that all of our error classes include:
    1) statusCode & message (mostly used for console.logs) properties
    2) serializeErrors method to ensure all errors are formatted the same
*/
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    /*
    This step is bc we are inheriting from a built in JS class
    Helps correctly set the prototype chain of our custom error classes
    Only really necessary if we are targeting es5 when transpiling typescript
    */
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
