import Forum from '../../../models/forumModel';
import { Request, Response, NextFunction } from 'express';

// ENDPOINT  GET api/forums
// PURPOSE   Retrieve a list of all forums
// ACCESS    all users
const getAllForums = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const forums = await Forum.find({});
    res.status(200).json(forums);
  } catch (error) {
    next({
      log: `Express error in getAllForums controller: ${error}`,
      status: 500,
      message: { err: 'Server error fetching forums' },
    });
  }
};

export default getAllForums;
