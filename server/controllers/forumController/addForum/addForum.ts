import Forum from '../../../models/forumModel';
import { Request, Response, NextFunction } from 'express';

// ENDPOINT  POST api/forums
// PURPOSE   Create a new forum
// ACCESS    Admin
const addForum = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;

  try {
    //TODO add auth check for admin status

    const forum = await Forum.create({
      title,
      description,
    });

    res.status(201).json(forum);
  } catch (error) {
    next({
      log: `Express error in addForum controller: ${error}`,
      status: 500,
      message: { err: 'Server error creating forum' },
    });
  }
};

export default addForum;
