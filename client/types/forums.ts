export interface IUser {
  firstName: string;
  lastName: string;
  _id: string;
  email: string;
  token: string;
}

export interface Thread {
  _id: string;
  title: string;
  content: string;
  user: IUser;
  createdAt: string;
}

export interface IForum {
  _id: string;
  title: string;
}
