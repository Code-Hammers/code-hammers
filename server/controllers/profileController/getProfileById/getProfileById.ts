import Profile from '../../../models/profileModel';
import { Request, Response, NextFunction } from 'express';
import { IProfile } from '../../../types/profile';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// ENDPOINT  GET api/profiles/:userID
// PURPOSE   Get profile by ID
// ACCESS    Private
const getProfileById = async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.params;
  try {
    const profile: IProfile | null = await Profile.findOne({ user: userID });

    if (!profile) {
      return next({
        log: 'Profile does not exist',
        status: 404,
        message: { err: 'An error occurred during profile retrieval' },
      });
    }
    // Route bypass for development - need AWS credentials to work on this route
    // This allows Mock Profile Photos to work in development
    if (process.env.NODE_ENV === 'development' && !process.env.IS_SK) {
      return res.status(200).json(profile);
    }

    if (profile.profilePhoto) {
      const presignedUrl = s3.getSignedUrl('getObject', {
        Bucket: process.env.BUCKET_NAME,
        Key: profile.profilePhoto,
        Expires: 60 * 5,
      });
      profile.profilePhoto = presignedUrl;
    }

    return res.status(200).json(profile);
  } catch (error) {
    return next({
      log: 'Express error in getProfileById Middleware',
      status: 500,
      message: { err: 'An error occurred during profile retrieval' },
    });
  }
};

export default getProfileById;
