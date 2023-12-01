import mongoose from "mongoose";
import { IProfile } from "../types/profile";

const profileSchema = new mongoose.Schema<IProfile>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  job: {
    title: String,
    company: String,
    description: String,
    date: Date,
  },
  socials: {
    linkedIn: {
      type: String,
    },
    github: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
