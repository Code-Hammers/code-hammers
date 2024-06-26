import { Request, Response } from 'express';
import GraduateInvitation from '../../../models/graduateInvitationModel';
import User from '../../../models/userModel';
import Profile from '../../../models/profileModel';
import generateToken from '../../../utils/generateToken';
import { BadRequestError, RequestValidationError, ValidationError } from '../../../errors';
import { isValidEmail, validatePassword, attachAuthCookie } from '../../../utils';

// ENDPOINT  POST api/users/register
// PURPOSE   Register a new user
// ACCESS    Public
const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { token } = req.query;

  // Check token exists
  if (!token) {
    throw new BadRequestError('Invalid token');
  }
  // Validations
  const validationErrors: ValidationError[] = [];
  // Check password exists
  const passwordValidation = validatePassword(password);
  if (passwordValidation instanceof ValidationError) {
    validationErrors.push(passwordValidation);
  }
  // Validate email
  if (!isValidEmail(email)) {
    validationErrors.push(new ValidationError('Invalid Email', 'email'));
  }
  if (validationErrors.length) {
    throw new RequestValidationError(validationErrors);
  }

  // Find users invitation
  const invitation = await GraduateInvitation.findOne({
    email,
    token,
  });

  // Check if valid invitation is found
  if (!invitation) {
    throw new BadRequestError('Invalid invite');
  }
  // Check if token is expired
  if (invitation.tokenExpiry.getTime() < Date.now()) {
    throw new BadRequestError('Token is expired, please reach out to TODO to get a new invitation');
  }
  if (invitation.isRegistered) {
    // Check if user is already registered
    throw new BadRequestError('Looks like you already registered bub');
  }

  // Create new user from valid invite data
  const user = await User.create({
    firstName: invitation.firstName,
    lastName: invitation.lastName,
    email,
    password,
  });

  // Update invitation
  invitation.isRegistered = true;
  invitation.registeredAt = new Date();
  await invitation.save();

  // Create base profile for user
  await Profile.create({
    user: user._id,
    firstName: invitation.firstName,
    lastName: invitation.lastName,
    cohort: invitation.cohort,
  });

  // Create auth token and attach to cookie
  const authToken = generateToken(user._id.toString());
  attachAuthCookie(res, authToken);

  // Send back the new user
  return res.status(201).send(user);
};

export default registerUser;
