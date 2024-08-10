import mongoose from 'mongoose';
import User from '../../../models/userModel';
import { Request, Response } from 'express';
import { NotFoundError, ValidationError, RequestValidationError } from '../../../errors';
import { UserType } from '../../../types/user';

// ENDPOINT  GET api/users/:userId
// PURPOSE   Get user by id
// ACCESS    Private
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new RequestValidationError([new ValidationError('Invalid user ID format', 'user ID')]);
  }

  const user: UserType | null = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError();
  }
  res.locals.user = user;
  return res.status(200).json(res.locals.user);
};

export default getUserById;
