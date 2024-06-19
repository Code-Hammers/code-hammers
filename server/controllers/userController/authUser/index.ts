import User from '../../../models/userModel';
import generateToken from '../../../utils/generateToken';
import { Request, Response, NextFunction } from 'express';
import { UserType } from '../../../types/user';

// ENDPOINT  POST api/users/login
// PURPOSE   Authenticate User and get token
// ACCESS    Public
const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const isValidEmail = email.match(/[\w\d.]+@[a-z]+.[\w]+$/gim);
  if (!isValidEmail) {
    return res.status(400).json({ msg: 'Please enter a valid email' }); //TODO Move to global error handler
  }

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required!' }); //TODO Move to global error handler
  }

  try {
    const user: UserType | null = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: 'User not found!' }); //TODO Move to global error handler
    }

    if (user && (await user.matchPassword!(password))) {
      res.locals.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const token = generateToken(user._id.toString());

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return res.status(200).json(res.locals.user);
    } else {
      return res.status(401).json({ msg: 'Incorrect password' }); //TODO Move to global error handler
    }
  } catch (error) {
    console.error('Error during user authentication:', error);
    return next({
      log: 'Express error in createUser Middleware',
      status: 503,
      message: { err: 'An error occurred during login' },
    });
  }
};

export default authUser;
