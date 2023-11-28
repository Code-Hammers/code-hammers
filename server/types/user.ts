import { ObjectId, Document } from "mongoose";
//TODO Do I need both of these?
export interface IUser extends Document {
  name: string;
  email: string;
  profilePic?: string;
  password: string;
  _id: ObjectId;
  lastVisit?: Date;
  date?: Date;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface UserType {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;

  matchPassword?: (password: string) => Promise<boolean>;
}
