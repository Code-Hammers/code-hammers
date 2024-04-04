import { Request } from "express";

interface UserPayload {
  _id: string;
}

export interface CustomRequest extends Request {
  user?: UserPayload;
}
