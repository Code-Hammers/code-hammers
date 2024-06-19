import { CustomError } from './customError';

export class InternalError extends CustomError {
  statusCode = 500;

  constructor() {
    super('❌ Internal Error');

    Object.setPrototypeOf(this, InternalError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Something went wrong, please try again later' }];
  }
}
