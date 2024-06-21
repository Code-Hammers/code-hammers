import { create } from 'domain';
import Post from '../../../models/postModel';
import Thread from '../../../models/threadModel';
import { Request, Response, NextFunction } from 'express';

// ENDPOINT  POST api/forums/:forumId/threads/:threadId/posts
// PURPOSE   Create a new post on thread
// ACCESS    Private
const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;
  const { content } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const threadExists = await Thread.findById(threadId);
    if (!threadExists) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    const newPost = await Post.create({
      thread: threadId,
      user: req.user.id,
      content,
    });

    res.status(201).json(newPost);
  } catch (error) {
    next({
      log: `Express error in createPost controller: ${error}`,
      status: 500,
      message: { err: 'Server error creating post' },
    });
  }
};

export default createPost;
