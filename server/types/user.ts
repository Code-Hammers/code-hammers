import { ObjectId, Document } from 'mongoose';
//TODO Do I need both of these?
export interface IUser extends Document {
  firstName: string;
  lastName: string;
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  matchPassword?: (password: string) => Promise<boolean>;
}
