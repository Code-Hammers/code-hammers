import User from '../../../models/userModel';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../../errors';
import { UserType } from '../../../types/user';

// ENDPOINT  DELETE api/users/:email
// PURPOSE   Delete user by email
// ACCESS    Private
const deleteUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.params;

  const user: UserType | null = await User.findOneAndDelete({ email });

  if (!user) {
    throw new NotFoundError();
  }

  return res.status(200).json({ msg: 'User successfully deleted!' });
};

export default deleteUserByEmail;
