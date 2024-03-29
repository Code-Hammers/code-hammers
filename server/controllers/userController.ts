import User from "../models/userModel";
import generateToken from "../utils/generateToken";
import { Request, Response, NextFunction } from "express";
import { UserType } from "../types/user";

// ENDPOINT  POST api/users/register
// PURPOSE   Register a new user
// ACCESS    Public
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;

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
      firstName,
      lastName,
      email,
      password,
    });

    if (user) {
      res.locals.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id.toString()),
      };
      return res.status(201).json(res.locals.user);
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
    return res.status(400).json({ msg: "Please enter a valid email" }); //TODO Move to global error handler
  }

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required!" }); //TODO Move to global error handler
  }

  try {
    const user: UserType | null = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "User not found!" }); //TODO Move to global error handler
    }

    if (user && (await user.matchPassword!(password))) {
      res.locals.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id.toString()),
      };
      return res.status(200).json(res.locals.user);
    } else {
      return res.status(401).json({ msg: "Incorrect password" }); //TODO Move to global error handler
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

// ENDPOINT  GET api/users/:userId
// PURPOSE   Get user by id
// ACCESS    Private
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const user: UserType | null = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ msg: "User not found!" }); //TODO Move to global error handler
    }
    res.locals.user = user;
    return res.status(200).json(res.locals.user);
  } catch (error) {
    return next({
      log: "Express error in getUserById Middleware",
      status: 500,
      message: { err: "An error occurred during retrieval" },
    });
  }
};

// ENDPOINT  DELETE api/users/:email
// PURPOSE   Delete user by email
// ACCESS    Private
const deleteUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;

  try {
    const user: UserType | null = await User.findOneAndRemove({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" }); //TODO Move to global error handler
    }

    return res.status(200).json({ msg: "User successfully deleted!" });
  } catch (error) {
    return next({
      log: "Express error in getUserByEmail Middleware",
      status: 500,
      message: { err: "An error occurred during removal" },
    });
  }
};

export { registerUser, authUser, getUserById, deleteUserByEmail };
