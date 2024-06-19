import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors';

interface UserPayload {
  id: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) throw new NotAuthorizedError();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.id).select('-password');

    if (!user) throw new NotAuthorizedError();

    req.user = { id: user._id.toString() };
    res.locals.user = user;
    next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};

export { protect };
