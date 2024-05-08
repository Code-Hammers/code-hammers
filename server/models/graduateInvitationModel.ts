import mongoose from "mongoose";
import { IGraduateInvitation } from "../types/graduateInvitation";

const graduateInvitationSchema = new mongoose.Schema<IGraduateInvitation>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  tokenExpiry: {
    type: Date,
    required: true,
  },
  isRegistered: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  firstName: String,
  lastName: String,
  cohort: String,
  registeredAt: Date,
  lastEmailSent: {
    type: Date,
    default: Date.now,
  },
});

const GraduateInvitation = mongoose.model<IGraduateInvitation>(
  "GraduateInvitation",
  graduateInvitationSchema
);

export default GraduateInvitation;
