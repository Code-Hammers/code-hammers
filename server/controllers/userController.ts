import User from "../models/userModel";
import generateToken from "../utils/generateToken";
import { Request, Response, NextFunction } from "express";
import { UserType } from "../types/user";

// ENDPOINT  POST api/users
// PURPOSE   Register a new user
// ACCESS    Public
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    const isValidEmail = email.match(/[\w\d\.]+@[a-z]+\.[\w]+$/gim);
    if (!isValidEmail) {
      return res.status(400).json("Invalid Email");
    }
    const userExists: UserType | null = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const user: UserType = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    }
  } catch (error) {
    console.error("Error during user signup:", error);
    return next({
      log: "Express error in createUser Middleware",
      status: 503,
      message: { err: "An error occurred during sign-up" },
    });
  }
};
// ENDPOINT  POST api/users/login
// PURPOSE   Authenticate User and get token
// ACCESS    Public
const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const isValidEmail = email.match(/[\w\d\.]+@[a-z]+\.[\w]+$/gim);
  if (!isValidEmail) {
    return res.status(400).json({ msg: "Please enter a valid email" });
  }

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required!" });
  }

  try {
    const user: UserType | null = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "User not found!" });
    }

    if (user && (await user.matchPassword!(password))) {
      res.locals.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      };
      return next();
    } else {
      return res.status(401).json({ msg: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during user authentication:", error);
    return next({
      log: "Express error in createUser Middleware",
      status: 503,
      message: { err: "An error occurred during login" },
    });
  }
};

export { registerUser, authUser };
