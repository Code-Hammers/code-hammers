import { Request, Response } from 'express';
import Profile from '../models/profileModel';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadProfilePicture = async (req: Request, res: Response) => {
  // Route bypass for development - need AWS credentials to work on this route
  if (process.env.NODE_ENV === 'development' && !process.env.IS_SK) {
    console.log('Big Sean approval / credentials required to work on this route');
    return res
      .status(201)
      .send({ message: 'Big Sean approval / credentials required to work on this route' });
  }

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { userID } = req.params;

  const file = req.file as Express.Multer.File;
  const s3Key = `profile-pictures/${Date.now()}_${file.originalname}`;

  const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: s3Key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'private',
  };

  try {
    await s3.upload(params).promise();
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userID },
      { profilePhoto: s3Key },
      { new: true },
    );

    const presignedUrl = s3.getSignedUrl('getObject', {
      Bucket: process.env.BUCKET_NAME,
      Key: s3Key,
      Expires: 60 * 5,
    });
    if (updatedProfile) {
      updatedProfile.profilePhoto = presignedUrl;
    }
    res.status(201).send(updatedProfile);
  } catch (err) {
    console.error('Error uploading to S3:', err);
  }
};

//TODO Currently not being used. Built into getProfileByID controller.
export const generatePresignedUrl = (req: Request, res: Response) => {
  const key = req.query.key;
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key as string,
    Expires: 60,
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error('Error generating URL:', err);
      return res.status(500).send('Error generating URL');
    }
    res.status(200).send({ message: 'URL generated successfully', url });
  });
};
