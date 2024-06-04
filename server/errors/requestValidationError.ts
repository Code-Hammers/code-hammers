import { CustomError } from "./customError";
import { ValidationError } from "./validationError";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  /* 
  when instantiating, accepts an array of ValidationError's as an argument
  in case 1 or more validations fail
  */
  constructor(public errors: ValidationError[]) {
    super('❌ Request Validation Failed');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(({ message, field }) => {
      return { message, field };
    });
  }
}
