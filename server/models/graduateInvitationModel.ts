import mongoose from 'mongoose';
import { IGraduateInvitation } from '../types/graduateInvitation';

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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  cohort: {
    type: String,
    required: true,
  },
  registeredAt: Date,
  lastEmailSent: {
    type: Date,
    default: Date.now,
  },
});

const GraduateInvitation = mongoose.model<IGraduateInvitation>(
  'GraduateInvitation',
  graduateInvitationSchema,
);

export default GraduateInvitation;
