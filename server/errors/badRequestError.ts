import { CustomError } from './customError';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(`❌ Bad Request Error: ${message}`);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
