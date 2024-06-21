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

// ENDPOINT  GET api/profiles
// PURPOSE   Get all profiles
// ACCESS    Private
const getAllProfiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profiles: IProfile[] = await Profile.find({});

    if (profiles.length === 0) {
      return next({
        log: 'There are no profiles to retrieve',
        status: 404,
        message: { err: 'There were no profiles to retrieve' },
      });
    } else {
      const processedProfiles = await Promise.all(
        profiles.map(async (profile) => {
          if (profile.profilePhoto) {
            const presignedUrl = s3.getSignedUrl('getObject', {
              Bucket: process.env.BUCKET_NAME,
              Key: profile.profilePhoto,
              Expires: 60 * 5,
            });
            profile.profilePhoto = presignedUrl;
          }
          return profile.toObject();
        }),
      );

      return res.status(201).json(processedProfiles);
    }
  } catch (error) {
    return next({
      log: 'Express error in getAllProfiles Middleware',
      status: 500,
      message: { err: 'An error occurred during profile creation' },
    });
  }
};

export default getAllProfiles;
