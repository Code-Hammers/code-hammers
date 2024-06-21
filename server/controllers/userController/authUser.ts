import { Request, Response } from 'express';
import User from '../../models/userModel';
import generateToken from '../../utils/generateToken';
import { isValidEmail } from '../../utils/validateEmail';
import {
  BadRequestError,
  InternalError,
  RequestValidationError,
  ValidationError,
} from '../../errors';
import { attachAuthCookie } from '../../utils/attachAuthCookie';

// ENDPOINT  POST api/users/login
// PURPOSE   Authenticate User and get token
// ACCESS    Public
export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate inputs
  const validationErrors: ValidationError[] = [];
  if (!email || !isValidEmail(email)) {
    validationErrors.push(new ValidationError('Invalid email', 'email'));
  }
  if (!password) {
    validationErrors.push(new ValidationError('Invalid password', 'password'));
  }
  if (validationErrors.length) throw new RequestValidationError(validationErrors);

  try {
    const user = await User.findOne({ email });

    // Check if user with email exists
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }
    // Check if supplied password matches
    const passwordsMatch = await user.matchPassword!(password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Attach JWT token to cookie
    attachAuthCookie(res, token);
    // Send back the user document
    return res.status(200).json(user);
  } catch (error) {
    throw new InternalError();
  }
};
