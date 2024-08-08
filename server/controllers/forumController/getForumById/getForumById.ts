import Forum from '../../../models/forumModel';
import Thread from '../../../models/threadModel';
import { Request, Response, NextFunction } from 'express';

// ENDPOINT  GET api/forums/:forumId
// PURPOSE   Retrieve a specific forum and its threads
// ACCESS    Private
const getForumById = async (req: Request, res: Response, next: NextFunction) => {
  const { forumId } = req.params;

  try {
    const forum = await Forum.findById(forumId);
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }

    const threads = await Thread.find({ forum: forumId }).populate('user', 'firstName lastName');

    res.status(200).json({ forum, threads });
  } catch (error) {
    next({
      log: `Express error in getForumById controller: ${error}`,
      status: 500,
      message: { err: 'Server error fetching forum details' },
    });
  }
};

export default getForumById;
