import Thread from '../../../models/threadModel';
import { Request, Response, NextFunction } from 'express';

// ENDPOINT  GET api/:forumId/threads
// PURPOSE   Retrieve all threads for a specific forum
// ACCESS    Private
const listThreadsByForumId = async (req: Request, res: Response, next: NextFunction) => {
  const { forumId } = req.params;

  try {
    const threads = await Thread.find({ forum: forumId })
      .populate('user', 'firstName lastName')
      .exec();

    res.status(200).json(threads);
  } catch (error) {
    next({
      log: `Express error in listThreadsByForum controller: ${error}`,
      status: 500,
      message: { err: 'Server error listing threads by forum' },
    });
  }
};

export default listThreadsByForumId;
