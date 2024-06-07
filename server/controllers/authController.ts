import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import asyncHandler from 'express-async-handler';

const authSession = asyncHandler(async (req, res) => {
  let token;

  if (req.cookies.token) {
    try {
      token = req.cookies.token;
      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      if (!decoded.id) {
        throw new Error('Invalid token - ID not found');
      }

      const user = await User.findById(decoded.id).select('-password');

      if (!user) throw new Error('User not found');

      res.locals.user = user;
      res.json({ isAuthenticated: true, user: res.locals.user });
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { authSession };
