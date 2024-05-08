import { Document } from "mongoose";

export interface IGraduateInvitation extends Document {
  email: string;
  token: string;
  tokenExpiry: Date;
  isRegistered: boolean;
  createdAt?: Date;
  firstName: string;
  lastName: string;
  cohort: string;
  registeredAt?: Date;
  lastEmailSent?: Date;
}
