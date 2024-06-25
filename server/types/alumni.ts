import { Schema } from 'mongoose';

export interface IAlumni extends Document {
  company: string;
  name: string;
  email: string;
  linkedIn: string;
  campus: string;
  cohort: Schema.Types.Mixed;
  jobTitle: string;
  industry: string;
  cities: string[];
}
