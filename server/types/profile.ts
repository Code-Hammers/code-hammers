import { Document, ObjectId } from "mongoose";

interface ISocial {
  linkedIn?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

interface IJob {
  title?: string;
  company?: string;
  description?: string;
  date?: Date;
}

export interface IProfile extends Document {
  user: ObjectId;
  name: String;
  bio?: string;
  job?: IJob;
  socials?: ISocial;
}
