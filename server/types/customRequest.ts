import { Request } from 'express';

interface UserPayload {
  id: string;
}

export interface CustomRequest<P = Record<string, string>> extends Request {
  user?: UserPayload;
  params: P;
}
