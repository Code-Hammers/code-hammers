import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import { Request, Response } from 'express';
import { UserType } from '../types/user';



// ENDPOINT  POST api/users
// PURPOSE   Register a new user
// ACCESS    Public
const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const isValidEmail = email.match(/[\w\d\.]+@[a-z]+\.[\w]+$/gim);
  if (!isValidEmail) {
    res.status(400).json({ message: 'Invalid email!' });
    return;
  }

  const userExists: UserType | null = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists!' });
    return;
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
  } else {
    res.status(400).json({ message: 'Invalid user data!' });
  }
});

// ENDPOINT  POST api/users/login
// PURPOSE   Authenticate User and get token
// ACCESS    Public
const authUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: UserType | null = await User.findOne({ email });

  if (user && (await user.matchPassword!(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400).json({ message: 'Invalid email or password!' });
  }
});

export { registerUser, authUser };

