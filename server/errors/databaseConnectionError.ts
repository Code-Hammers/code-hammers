import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;

  constructor() {
    super('❌ Database Connection Error');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Something went wrong, please try again later' }];
  }
}
