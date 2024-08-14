export class ValidationError extends Error {
  field: string;
  // use field argument for info on what failed validation, eg. "email" or "password"
  constructor(message: string, field: string) {
    super(message);

    this.field = field;

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
