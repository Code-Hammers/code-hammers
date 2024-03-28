// profileModel.ts
import mongoose, { Schema } from "mongoose";
import { IProfile } from "../types/profile";

const profileSchema = new Schema<IProfile>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  profilePhoto: String,
  cohort: String,
  graduationYear: Number,
  email: String,
  linkedInProfile: String,
  professionalSummary: String,
  skills: [String],
  specializations: [String],
  careerInformation: {
    currentPosition: {
      title: String,
      company: String,
    },
    pastPositions: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
      },
    ],
  },
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  projects: [
    {
      name: String,
      description: String,
      link: String,
    },
  ],
  personalBio: String,
  testimonials: [
    {
      from: String,
      relation: String,
      text: String,
    },
  ],
  socialMediaLinks: {
    twitter: String,
    blog: String,
    other: [String],
  },
  availabilityForNetworking: Boolean,
  bootcampExperience: String,
  achievementsAndCertifications: [String],
  volunteerWork: [String],
  eventParticipation: [String],
  gallery: [String],
  blogOrWriting: [
    {
      title: String,
      link: String,
    },
  ],
});

const Profile = mongoose.model<IProfile>("profiles", profileSchema);

export default Profile;
