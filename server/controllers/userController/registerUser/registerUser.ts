import User from '../../../models/userModel';
import Profile from '../../../models/profileModel';
import generateToken from '../../../utils/generateToken';
import { Request, Response, NextFunction } from 'express';
import { UserType } from '../../../types/user';
import GraduateInvitation from '../../../models/graduateInvitationModel';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { token } = req.query;

  try {
    const isValidEmail = email.match(/[\w\d.]+@[a-z]+.[\w]+$/gim);
    if (!isValidEmail) {
      return res.status(400).json('Invalid Email');
    }

    const invitation = await GraduateInvitation.findOne({
      email,
      token,
      tokenExpiry: { $gt: new Date() },
      isRegistered: false,
    });

    if (!invitation) {
      return res.status(400).json({ message: 'Invalid or expired registration token' });
    }
    const userExists: UserType | null = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists!' });
    }
    const user: UserType = await User.create({
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      email,
      password,
    });

    if (user) {
      invitation.isRegistered = true;
      await invitation?.save();
      await Profile.create({
        user: user._id,
        firstName: invitation.firstName,
        lastName: invitation.lastName,
        cohort: invitation.cohort,
      });
      res.locals.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      res.cookie('token', generateToken(user._id.toString()));
      return res.status(201).json(res.locals.user);
    }
  } catch (error) {
    console.error('Error during user signup:', error);
    return next({
      log: 'Express error in createUser Middleware',
      status: 503,
      message: { err: 'An error occurred during sign-up' },
    });
  }
};

export default registerUser;
