import Profile from '../../../models/profileModel';
import { Request, Response, NextFunction } from 'express';

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

export default createProfile;
