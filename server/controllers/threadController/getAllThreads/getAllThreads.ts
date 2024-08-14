import Thread from '../../../models/threadModel';
import { Request, Response, NextFunction } from 'express';

// ENDPOINT  GET api/threads
// PURPOSE   Retrieve all threads
// ACCESS    Private
const getAllThreads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const threads = await Thread.find({}).populate('user', 'firstName lastName').exec();
    res.status(200).json(threads);
  } catch (error) {
    next({
      log: `Express error in getAllThreads controller: ${error}`,
      status: 500,
      message: { err: 'Server error fetching all threads' },
    });
  }
};

export default getAllThreads;
