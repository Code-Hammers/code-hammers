import { Response } from 'express';

export const attachAuthCookie = (res: Response, token: string) => {
  // Attach JWT token to cookie
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};
