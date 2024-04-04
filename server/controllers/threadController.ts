import Post from "../models/postModel";
import Thread from "../models/threadModel";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types/customRequest";

// ENDPOINT  POST api/:forumId/threads
// PURPOSE   Create a new thread
// ACCESS    Private
const createThread = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { forumId } = req.params;
  const { title, content } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const userId = req.user;

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
      message: { err: "Server error creating thread" },
    });
  }
};

// ENDPOINT  GET api/:forumId/threads
// PURPOSE   Retrieve all threads for a specific forum
// ACCESS    Private
const listThreadsByForumId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { forumId } = req.params;

  try {
    const threads = await Thread.find({ forum: forumId })
      .populate("user", "firstName lastName")
      .exec();

    res.status(200).json(threads);
  } catch (error) {
    next({
      log: `Express error in listThreadsByForum controller: ${error}`,
      status: 500,
      message: { err: "Server error listing threads by forum" },
    });
  }
};

// ENDPOINT  GET api/forums/:forumId/threads/:threadId
// PURPOSE   Retrieve a specific thread and all of its posts
// ACCESS    Private
const getThreadById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { forumId, threadId } = req.params;

  try {
    const thread = await Thread.findOne({ _id: threadId, forum: forumId })
      .populate("user", "firstName lastName")
      .exec();

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    const posts = await Post.find({ thread: threadId })
      .populate("user", "firstName lastName")
      .exec();

    res.status(200).json({ thread, posts });
  } catch (error) {
    next({
      log: `Express error in getThreadById controller: ${error}`,
      status: 500,
      message: { err: "Server error fetching thread details" },
    });
  }
};

export { createThread, listThreadsByForumId, getThreadById };
