import path from 'path';
import express, { Request, Response, Application } from 'express';
import 'express-async-errors';
import {
  userRouter,
  profileRouter,
  authRouter,
  imageRouter,
  alumniRouter,
  forumRouter,
  devRouter,
} from './routes';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import { NotFoundError } from './errors';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.use('/api/users', userRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/auth', authRouter);
app.use('/api/images', imageRouter);
app.use('/api/alumni', alumniRouter);
app.use('/api/forums', forumRouter);
app.use('/api/devRoutes', devRouter);

if (process.env.NODE_ENV === 'production') {
  console.log(`SERVER STARTED IN PRODUCTION`);
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, '../../client/build/index.html')),
  );
} else {
  console.log('SERVER STARTED IN DEV');
  app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'API Running - Hazzah!' });
  });
}

app.use((_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 3000;

export const startServer = () => {
  connectDB();

  return app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
  );
};

if (require.main === module) {
  startServer();
}

export default app;
