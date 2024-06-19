import { Request, Response } from 'express';
import GraduateInvitation from '../../models/graduateInvitationModel';
import User from '../../models/userModel';
import Profile from '../../models/profileModel';
import generateToken from '../../utils/generateToken';
import { UserType } from '../../types/user';
import { BadRequestError, InternalError } from '../../errors';

// ENDPOINT  POST api/users/register
// PURPOSE   Register a new user
// ACCESS    Public
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { token } = req.query;
  // Check token exists
  if (!token) {
    throw new BadRequestError('Invalid token');
  }
  // Check password exists
  if (!password) {
    throw new BadRequestError('You must supply a valid password to register');
  }
  // Validate email
  const isValidEmail = email.match(/[\w\d.]+@[a-z]+.[\w]+$/gim);
  if (!isValidEmail) {
    throw new BadRequestError('Invalid Email');
  }

  try {
    const invitation = await GraduateInvitation.findOne({
      email,
      token,
      tokenExpiry: { $gt: new Date() },
    });

    // Check if user is already registered
    if (invitation?.isRegistered) {
      throw new BadRequestError('Looks like you already registered bub');
    }

    // Check if valid invitation is found
    if (!invitation) {
      //TODO Needs better error handling - this can trigger with situaions other than bad or missing token
      throw new BadRequestError('Invalid or expired registration token');
    }

    const user: UserType = await User.create({
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      email,
      password,
    });

    if (user) {
      invitation.isRegistered = true;
      invitation.registeredAt = new Date();
      await invitation.save();
      await Profile.create({
        user: user._id,
        firstName: invitation.firstName,
        lastName: invitation.lastName,
        cohort: invitation.cohort,
      });

      res.cookie('token', generateToken(user._id.toString()));
      return res.status(201).json(user);
    }
  } catch (error) {
    console.error(error);
    throw new InternalError();
  }
};
