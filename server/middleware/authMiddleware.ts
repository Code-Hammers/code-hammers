import jwt from "jsonwebtoken";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import { CustomRequest } from "../types/customRequest";

const protect = asyncHandler(async (req: CustomRequest, res, next) => {
  let token;

  if (req.cookies.token) {
    try {
      token = req.cookies.token;
      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      if (!decoded.id) {
        throw new Error("Invalid token - ID not found");
      }

      const user = await User.findById(decoded.id).select("-password");

      if (!user) throw new Error("User not found");
      req.user = { id: user._id.toString() };
      res.locals.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
