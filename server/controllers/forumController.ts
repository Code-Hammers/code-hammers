import Forum from "../models/forumModel";
import Thread from "../models/threadModel";
import { Request, Response, NextFunction } from "express";

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
      message: { err: "Server error creating forum" },
    });
  }
};

// ENDPOINT  GET api/forums
// PURPOSE   Retrieve a list of all forums
// ACCESS    all users
const getAllForums = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const forums = await Forum.find({});
    res.status(200).json(forums);
  } catch (error) {
    next({
      log: `Express error in getAllForums controller: ${error}`,
      status: 500,
      message: { err: "Server error fetching forums" },
    });
  }
};

// ENDPOINT  GET api/forums/:forumId
// PURPOSE   Retrieve a specific forum and its threads
// ACCESS    all users
const getForumById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { forumId } = req.params;

  try {
    const forum = await Forum.findById(forumId);
    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    const threads = await Thread.find({ forum: forumId }).populate(
      "user",
      "firstName lastName"
    );

    res.status(200).json({ forum, threads });
  } catch (error) {
    next({
      log: `Express error in getForumById controller: ${error}`,
      status: 500,
      message: { err: "Server error fetching forum details" },
    });
  }
};

// ENDPOINT  PUT api/forums/:forumId
// PURPOSE   Update title/description of forum
// ACCESS    Admin
const updateForum = async (req: Request, res: Response, next: NextFunction) => {
  const { forumId } = req.params;
  const { title, description } = req.body;

  try {
    //TODO add auth check for admin status

    const forum = await Forum.findByIdAndUpdate(
      forumId,
      { $set: { title, description } },
      { new: true }
    );

    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    res.status(200).json(forum);
  } catch (error) {
    next({
      log: `Express error in updateForum controller: ${error}`,
      status: 500,
      message: { err: "Server error updating forum details" },
    });
  }
};

// ENDPOINT  DELETE api/forums/:forumId
// PURPOSE   Delete a forum
// ACCESS    Admin
const deleteForum = async (req: Request, res: Response, next: NextFunction) => {
  const { forumId } = req.params;

  try {
    //TODO add auth check for admin status

    const deletedForum = await Forum.findByIdAndDelete(forumId);
    console.log("deletedForum", deletedForum);

    if (!deletedForum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    res.status(200).json({ message: "Forum deleted successfully" });
  } catch (error) {
    next({
      log: `Express error in deleteForum controller: ${error}`,
      status: 500,
      message: { err: "Server error deleting forum" },
    });
  }
};

export { addForum, getAllForums, getForumById, updateForum, deleteForum };
