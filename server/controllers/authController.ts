import { Request, Response } from 'express';
import { NotAuthorizedError } from '../errors';

const authSession = async (_req: Request, res: Response) => {
  if (!res.locals.user) throw new NotAuthorizedError();
  res.json({ isAuthenticated: true, user: res.locals.user });
};

export { authSession };
