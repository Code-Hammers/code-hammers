import { Request } from 'express';

interface UserPayload {
  id: string;
}

export interface CustomRequest extends Request {
  user?: UserPayload;
}
