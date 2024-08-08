import Post from '../../../models/postModel';
import Thread from '../../../models/threadModel';
import { Request, Response, NextFunction } from 'express';

// ENDPOINT  GET api/forums/:forumId/threads/:threadId
// PURPOSE   Retrieve a specific thread and all of its posts
// ACCESS    Private
const getThreadById = async (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ _id: threadId })
      .populate('user', 'firstName lastName')
      .exec();

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    const posts = await Post.find({ thread: threadId })
      .populate('user', 'firstName lastName')
      .exec();

    res.status(200).json({ thread, posts });
  } catch (error) {
    next({
      log: `Express error in getThreadById controller: ${error}`,
      status: 500,
      message: { err: 'Server error fetching thread details' },
    });
  }
};

export default getThreadById;
