import Profile from "../models/profileModel";
import { Request, Response, NextFunction } from "express";
import { IProfile } from "../types/profile";

// ENDPOINT  POST api/profiles/create
// PURPOSE   Create a new profile
// ACCESS    Private
const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, bio, job, socials } = req.body;

  try {
    const profile: IProfile = await Profile.create({
      user,
      bio,
      job,
      socials,
    });

    if (profile) {
      return res.status(201).json(profile);
    }
  } catch (error) {
    return next({
      log: "Express error in createProfile Middleware",
      status: 500,
      message: { err: "An error occurred during profile creation" },
    });
  }
};

export { createProfile };
