import Profile from '../../../models/profileModel';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../../errors';
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
  const profiles: IProfile[] = await Profile.find({});

  if (profiles.length === 0) {
    throw new NotFoundError();
  } else {
    // Route bypass for development - need AWS credentials to work on this route
    // This allows Mock Profile Photos to work in development
    if (process.env.NODE_ENV === 'development' && !process.env.IS_SK) {
      return res.status(200).send(profiles);
    }
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
};

export default getAllProfiles;
