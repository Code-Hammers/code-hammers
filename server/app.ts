import path from 'path';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import {
  userRouter,
  profileRouter,
  authRouter,
  imageRouter,
  alumniRouter,
  forumRouter,
  devRouter,
  applicationsRoutes,
} from './routes';
import errorHandler from './middleware/errorHandler';
import { NotFoundError } from './errors';

// Instantiate application
const app = express();

// Middleware to parse request bodies
app.use(express.json());
// Middleware to parse request cookies
app.use(cookieParser());

// AWS Production Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

// API routers
app.use('/api/users', userRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/auth', authRouter);
app.use('/api/images', imageRouter);
app.use('/api/alumni', alumniRouter);
app.use('/api/forums', forumRouter);
app.use('/api/devRoutes', devRouter);
app.use('/api/applications', applicationsRoutes);

// Serve client from build in production
if (process.env.NODE_ENV === 'production') {
  console.log(`SERVER STARTED IN PRODUCTION`);
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (_req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, '../../client/build/index.html')),
  );
}

// Catch all route handler
app.use((_req, _res) => {
  throw new NotFoundError();
});

// Global error handler
app.use(errorHandler);

export default app;
