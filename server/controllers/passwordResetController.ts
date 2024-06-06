import { Request, Response } from 'express';
// import nodemailer or similar

const sendPasswordResetEmail = async (_req: Request, res: Response) => {
  try {
    //build out controller logic to use nodemailer and send email
    res.status(200).send('Database seeded successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email.');
  }
};

export { sendPasswordResetEmail };
