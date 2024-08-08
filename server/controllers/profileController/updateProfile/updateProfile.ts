import Profile from '../../../models/profileModel';
import { Request, Response, NextFunction } from 'express';
import { IProfile } from '../../../types/profile';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// ENDPOINT  PUT api/profiles/:UserID
// PURPOSE   Update an existing profile
// ACCESS    Private
const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.params;
  const { firstName, lastName, email, personalBio } = req.body;

  const newProfile = {
    firstName,
    lastName,
    email,
    personalBio,
  };

  try {
    const profile: IProfile | null = await Profile.findOneAndUpdate({ user: userID }, newProfile, {
      new: true,
    });

    if (!profile) {
      return next({
        log: 'Express error in updateProfile Middleware - NO PROFILE FOUND',
        status: 404,
        message: { err: 'An error occurred during profile update' },
      });
    } else {
      return res.status(200).json(profile);
    }
  } catch (error) {
    return next({
      log: 'Express error in updateProfile Middleware',
      status: 500,
      message: { err: 'An error occurred during profile update' },
    });
  }
};

export default updateProfile;
