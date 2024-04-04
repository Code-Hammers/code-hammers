import Forum from "../models/forumModel";
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

export { createThread, listThreadsByForumId };
