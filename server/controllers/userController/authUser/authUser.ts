import User from '../../../models/userModel';
import generateToken from '../../../utils/generateToken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError, ValidationError, RequestValidationError } from '../../../errors';
import { UserType } from '../../../types/user';

// ENDPOINT  POST api/users/login
// PURPOSE   Authenticate User and get token
// ACCESS    Public
const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    if (!email)
      throw new RequestValidationError([new ValidationError('You must enter an email', 'email')]);
    if (!password)
      throw new RequestValidationError([
        new ValidationError('You must enter a password', 'password'),
      ]);
  }

  const isValidEmail = email.match(/[\w\d.]+@[a-z]+.[\w]+$/gim);
  if (!isValidEmail) {
    throw new RequestValidationError([new ValidationError('Please enter a valid email', 'email')]);
  }

  const user: UserType | null = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError();
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
    throw new NotAuthorizedError();
  }
};

export default authUser;
