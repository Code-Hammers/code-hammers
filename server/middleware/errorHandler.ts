import { Request, Response, NextFunction } from 'express';
import { CustomError, InternalError } from '../errors';

interface OldError {
  status: number;
  log: string;
  message: { err: string };
}

const errorHandler = (err: Error | OldError, _req: Request, res: Response, _next: NextFunction) => {
  // If it is one of our custom errors use its properties/method
  if (err instanceof CustomError) {
    console.log(err.message);
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  // Handle errors thrown the old way
  if (!(err instanceof Error) && err.status && err.log && err.message) {
    console.log(err.log);
    return res.status(err.status).send([{ message: err.message.err }]);
  }

  // If it is an unknown error send back a generic error
  const internalError = new InternalError();
  return res.status(internalError.statusCode).send(internalError.serializeErrors());
};

export default errorHandler;
