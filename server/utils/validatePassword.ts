import { ValidationError } from '../errors';

export const validatePassword = (password?: string) => {
  if (!password || typeof password !== 'string') {
    return new ValidationError('Please provide a valid password', 'password');
  }

  if (password.length < 7) {
    return new ValidationError('Password must be at least 7 characters long', 'password');
  }

  return true;
};
