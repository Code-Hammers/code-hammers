import { Request, Response, NextFunction } from 'express';
import Post from '../models/postModel';
import Thread from '../models/threadModel';
import { sortAndPopulate } from './helpers/queryHelpers';

// ENDPOINT  GET api/forums/:forumId/threads/:threadId/posts
// PURPOSE   Retrieve all posts from a specific thread
// ACCESS    Private
const listPostsByThreadId = async (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;

  try {
    const postsQuery = Post.find({ thread: threadId });
    const posts = await sortAndPopulate(postsQuery);

    res.status(200).json(posts);
  } catch (error) {
    next({
      log: `Express error in listPostsByThreadId controller: ${error}`,
      status: 500,
      message: { err: 'Server error fetching posts' },
    });
  }
};

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

// ENDPOINT  PUT api/forums/:forumId/threads/:threadId/:postId
// PURPOSE   Update an existing post
// ACCESS    Private
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const postToCheck = await Post.findById(postId).populate('user');
    if (!postToCheck) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!req.user || postToCheck.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const updatedPostQuery = Post.findByIdAndUpdate(
      postId,
      { $set: { content } },
      { new: true, runValidators: true },
    );

    const updatedPost = await sortAndPopulate(updatedPostQuery);

    if (!updatedPost) {
      return res.status(404).json({ message: 'Unable to update post or post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next({
      log: `Express error in updatePost controller: ${error}`,
      status: 500,
      message: { err: 'Server error updating post' },
    });
  }
};

// ENDPOINT  DELETE api/forums/:forumId/threads/:threadId/:postId
// PURPOSE   Delete an existing post
// ACCESS    Private, Admin
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;

  try {
    const postToCheck = await Post.findById(postId).populate('user');
    if (!postToCheck) {
      return res.status(404).json({ message: 'Post not found' });
    }

    //TODO Add admin rights to delete posts for Jimmy
    if (!req.user || postToCheck.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found or already deleted' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next({
      log: `Express error in deletePost controller: ${error}`,
      status: 500,
      message: { err: 'Server error deleting post' },
    });
  }
};

export { listPostsByThreadId, createPost, updatePost, deletePost };
