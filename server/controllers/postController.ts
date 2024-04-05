import Post from "../models/postModel";
import { Request, Response, NextFunction } from "express";

// ENDPOINT  GET api/forums/:forumId/threads/:threadId/posts
// PURPOSE   Retrieve all posts from a specific thread
// ACCESS    Private
const listPostsByThreadId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { threadId } = req.params;

  try {
    const posts = await Post.find({ thread: threadId })
      .populate("user", "firstName lastName")
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    next({
      log: `Express error in listPostsByThreadId controller: ${error}`,
      status: 500,
      message: { err: "Server error fetching posts" },
    });
  }
};

export { listPostsByThreadId };
