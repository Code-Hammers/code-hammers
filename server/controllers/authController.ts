import jwt from "jsonwebtoken";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";

const authSession = asyncHandler(async (req, res, next) => {
  let token;
  console.log("PROTECT HIT");
  console.log(req.headers);
  console.log("cookies:", req.cookies);

  if (req.cookies.token) {
    console.log(req.headers);
    try {
      console.log("try block hit!");
      token = req.cookies.token;
      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      if (!decoded.id) {
        throw new Error("Invalid token - ID not found");
      }

      const user = await User.findById(decoded.id).select("-password");

      if (!user) throw new Error("User not found");

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

export { authSession };
