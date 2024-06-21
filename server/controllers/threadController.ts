import { Request, Response, NextFunction } from 'express';
import Post from '../models/postModel';
import Thread from '../models/threadModel';
import { sortAndPopulate, aggregateThreadsWithPostCount } from './helpers/queryHelpers';

// ENDPOINT  POST api/:forumId/threads
// PURPOSE   Create a new thread
// ACCESS    Private
const createThread = async (req: Request, res: Response, next: NextFunction) => {
  const { forumId } = req.params;
  const { title, content } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  const userId = req.user.id;

  try {
    const thread = await Thread.create({
      forum: forumId,
      user: userId,
      title,
      content,
    });

    res.status(201).json(thread);
  } catch (error) {
    next({
      log: `Express error in createThread controller: ${error}`,
      status: 500,
      message: { err: 'Server error creating thread' },
    });
  }
};

// ENDPOINT  GET api/threads
// PURPOSE   Retrieve all threads
// ACCESS    Private
const getAllThreads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const threads = await aggregateThreadsWithPostCount(undefined, 'createdAt', -1);

    res.status(200).json(threads);
  } catch (error) {
    next({
      log: `Express error in getAllThreads controller: ${error}`,
      status: 500,
      message: { err: 'Server error fetching all threads' },
    });
  }
};

// ENDPOINT  GET api/:forumId/threads
// PURPOSE   Retrieve all threads for a specific forum
// ACCESS    Private
const listThreadsByForumId = async (req: Request, res: Response, next: NextFunction) => {
  const { forumId } = req.params;

  try {
    const threadsQuery = Thread.find({ forum: forumId });
    const threads = await sortAndPopulate(threadsQuery);

    res.status(200).json(threads);
  } catch (error) {
    next({
      log: `Express error in listThreadsByForum controller: ${error}`,
      status: 500,
      message: { err: 'Server error listing threads by forum' },
    });
  }
};

// ENDPOINT  GET api/forums/:forumId/threads/:threadId
// PURPOSE   Retrieve a specific thread and all of its posts
// ACCESS    Private
const getThreadById = async (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;

  try {
    const threadQuery = Thread.findOne({ _id: threadId });
    const thread = await sortAndPopulate(threadQuery);

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    const postsQuery = Post.find({ thread: threadId });
    const posts = await sortAndPopulate(postsQuery);

    res.status(200).json({ thread, posts });
  } catch (error) {
    next({
      log: `Express error in getThreadById controller: ${error}`,
      status: 500,
      message: { err: 'Server error fetching thread details' },
    });
  }
};

// ENDPOINT  PUT api/forums/:forumId/threads/:threadId
// PURPOSE   Update a specific thread
// ACCESS    Private/Admin
const updateThread = async (req: Request, res: Response, next: NextFunction) => {
  const { forumId, threadId } = req.params;
  const { title, content } = req.body;

  try {
    const thread = await Thread.findOne({ _id: threadId, forum: forumId });
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    if (!req.user || thread.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this thread' });
    }

    const updateThreadQuery = Thread.findByIdAndUpdate(
      threadId,
      { $set: { title, content } },
      { new: true, runValidators: true },
    );
    const updatedThread = await sortAndPopulate(updateThreadQuery, 'createdAt', 1);
    res.status(200).json(updatedThread);
  } catch (error) {
    next({
      log: `Express error in updateThread controller: ${error}`,
      status: 500,
      message: { err: 'Server error updating thread' },
    });
  }
};

// ENDPOINT  DELETE api/forums/:forumId/threads/:threadId
// PURPOSE   Delete a specific thread
// ACCESS    Private/Admin
const deleteThread = async (req: Request, res: Response, next: NextFunction) => {
  const { forumId, threadId } = req.params;

  try {
    const threadToCheck = await Thread.findById(threadId);
    if (!threadToCheck) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    //TODO Add admin auth check
    if (!req.user || threadToCheck.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this thread' });
    }

    const deletedThread = await Thread.findByIdAndDelete({
      _id: threadId,
      forum: forumId,
    });

    if (!deletedThread) {
      return res.status(404).json({ message: 'Thread not found or already deleted' });
    }

    res.status(200).json({ message: 'Thread deleted successfully' });
  } catch (error) {
    next({
      log: `Express error in deleteThread controller: ${error}`,
      status: 500,
      message: { err: 'Server error deleting thread' },
    });
  }
};

export {
  createThread,
  listThreadsByForumId,
  getThreadById,
  updateThread,
  deleteThread,
  getAllThreads,
};
