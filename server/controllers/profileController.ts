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

// ENDPOINT  PATCH api/profiles/:UserID
// PURPOSE   Update an existing profile
// ACCESS    Private
const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userID } = req.params;
  const { bio, job, socials } = req.body;
  const newProfile = {
    bio,
    job,
    socials,
  };

  try {
    const profile: IProfile | null = await Profile.findOneAndUpdate(
      { user: userID },
      newProfile,
      { new: true }
    );
    console.log(profile);
    if (!profile) {
      return next({
        log: "Express error in updateProfile Middleware - NO PROFILE FOUND",
        status: 404,
        message: { err: "An error occurred during profile update" },
      });
    } else {
      return res.status(200).json(profile);
    }
  } catch (error) {
    return next({
      log: "Express error in updateProfile Middleware",
      status: 500,
      message: { err: "An error occurred during profile update" },
    });
  }
};

// ENDPOINT  GET api/profiles
// PURPOSE   Get all profiles
// ACCESS    Private
const getAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profiles: IProfile[] = await Profile.find({});

    if (profiles.length === 0) {
      return next({
        log: "There are no profiles to retrieve",
        status: 404,
        message: { err: "There were no profiles to retrieve" },
      });
    } else {
      return res.status(201).json(profiles);
    }
  } catch (error) {
    return next({
      log: "Express error in getAllProfiles Middleware",
      status: 500,
      message: { err: "An error occurred during profile creation" },
    });
  }
};

// ENDPOINT  GET api/profiles/:userID
// PURPOSE   Get profile by ID
// ACCESS    Private
const getProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userID } = req.params;
  try {
    const profile: IProfile | null = await Profile.findOne({ user: userID });

    if (!profile) {
      return next({
        log: "Profile does not exist",
        status: 404,
        message: { err: "An error occurred during profile retrieval" },
      });
    } else {
      return res.status(201).json(profile);
    }
  } catch (error) {
    return next({
      log: "Express error in getProfileById Middleware",
      status: 500,
      message: { err: "An error occurred during profile creation" },
    });
  }
};

export { createProfile, getAllProfiles, getProfileById, updateProfile };
