import Post from '../../../models/postModel';
import { Request, Response, NextFunction } from 'express';

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

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: { content } },
      { new: true, runValidators: true },
    ).populate('user', 'firstName lastName');

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

export default updatePost;
