import User from '../../../models/userModel';
import { Request, Response, NextFunction } from 'express';
import { UserType } from '../../../types/user';

// ENDPOINT  DELETE api/users/:email
// PURPOSE   Delete user by email
// ACCESS    Private
const deleteUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.params;

  try {
    const user: UserType | null = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found!' }); //TODO Move to global error handler
    }

    return res.status(200).json({ msg: 'User successfully deleted!' });
  } catch (error) {
    return next({
      log: 'Express error in getUserByEmail Middleware',
      status: 500,
      message: { err: 'An error occurred during removal' },
    });
  }
};

export default deleteUserByEmail;
