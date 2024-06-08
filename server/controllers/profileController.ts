import Profile from '../models/profileModel';
import { Request, Response, NextFunction } from 'express';
import { IProfile } from '../types/profile';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// ENDPOINT  POST api/profiles/create
// PURPOSE   Create a new profile
// ACCESS    Private
const createProfile = async (req: Request, res: Response, next: NextFunction) => {
  const {
    user,
    fullName,
    nickname,
    profilePhoto,
    cohort,
    graduationYear,
    email,
    linkedInProfile,
    gitHubProfile,
    professionalSummary,
    skills,
    specializations,
    careerInformation,
    education,
    projects,
    personalBio,
    testimonials,
    socialMediaLinks,
    availabilityForNetworking,
    bootcampExperience,
    achievementsAndCertifications,
    volunteerWork,
    eventParticipation,
    gallery,
    blogOrWriting,
  } = req.body;

  try {
    const profile = await Profile.create({
      user,
      fullName,
      nickname,
      profilePhoto,
      cohort,
      graduationYear,
      email,
      linkedInProfile,
      gitHubProfile,
      professionalSummary,
      skills,
      specializations,
      careerInformation,
      education,
      projects,
      personalBio,
      testimonials,
      socialMediaLinks,
      availabilityForNetworking,
      bootcampExperience,
      achievementsAndCertifications,
      volunteerWork,
      eventParticipation,
      gallery,
      blogOrWriting,
    });

    if (profile) {
      return res.status(201).json(profile);
    }
  } catch (error) {
    console.error(error);
    return next({
      log: 'Express error in createProfile Middleware',
      status: 500,
      message: {
        err: 'An error occurred during profile creation. Please try again.',
      },
    });
  }
};

// ENDPOINT  PUT api/profiles/:UserID
// PURPOSE   Update an existing profile
// ACCESS    Private
const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.params;
  const { nickName, email, personalBio, linkedInProfile, gitHubProfile, cohort, skills, specializations, careerInformation, socialMediaLinks, availabilityForNetworking } = req.body;

  const newProfile = {
    nickName,
    email,
    personalBio,
    linkedInProfile,
    gitHubProfile,
    cohort,
    skills,
    specializations,
    careerInformation,
    socialMediaLinks,
    availabilityForNetworking,
  };

  try {
    const profile: IProfile | null = await Profile.findOneAndUpdate({ user: userID }, newProfile, {
      new: true,
    });

    if (!profile) {
      return next({
        log: 'Express error in updateProfile Middleware - NO PROFILE FOUND',
        status: 404,
        message: { err: 'An error occurred during profile update' },
      });
    } else {
      return res.status(200).json(profile);
    }
  } catch (error) {
    return next({
      log: 'Express error in updateProfile Middleware',
      status: 500,
      message: { err: 'An error occurred during profile update' },
    });
  }
};

// ENDPOINT  GET api/profiles
// PURPOSE   Get all profiles
// ACCESS    Private
const getAllProfiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profiles: IProfile[] = await Profile.find({});

    if (profiles.length === 0) {
      return next({
        log: 'There are no profiles to retrieve',
        status: 404,
        message: { err: 'There were no profiles to retrieve' },
      });
    } else {
      const processedProfiles = await Promise.all(
        profiles.map(async (profile) => {
          if (profile.profilePhoto) {
            const presignedUrl = s3.getSignedUrl('getObject', {
              Bucket: process.env.BUCKET_NAME,
              Key: profile.profilePhoto,
              Expires: 60 * 5,
            });
            profile.profilePhoto = presignedUrl;
          }
          return profile.toObject();
        }),
      );

      return res.status(201).json(processedProfiles);
    }
  } catch (error) {
    return next({
      log: 'Express error in getAllProfiles Middleware',
      status: 500,
      message: { err: 'An error occurred during profile creation' },
    });
  }
};

// ENDPOINT  GET api/profiles/:userID
// PURPOSE   Get profile by ID
// ACCESS    Private
const getProfileById = async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.params;
  try {
    const profile: IProfile | null = await Profile.findOne({ user: userID });

    if (!profile) {
      return next({
        log: 'Profile does not exist',
        status: 404,
        message: { err: 'An error occurred during profile retrieval' },
      });
    }
    if (profile.profilePhoto) {
      const presignedUrl = s3.getSignedUrl('getObject', {
        Bucket: process.env.BUCKET_NAME,
        Key: profile.profilePhoto,
        Expires: 60 * 5,
      });
      profile.profilePhoto = presignedUrl;
    }

    return res.status(200).json(profile);
  } catch (error) {
    return next({
      log: 'Express error in getProfileById Middleware',
      status: 500,
      message: { err: 'An error occurred during profile retrieval' },
    });
  }
};

export { createProfile, getAllProfiles, getProfileById, updateProfile };
