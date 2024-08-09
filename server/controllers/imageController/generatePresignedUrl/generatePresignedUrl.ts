import { Request, Response } from 'express';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

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

export default generatePresignedUrl;
