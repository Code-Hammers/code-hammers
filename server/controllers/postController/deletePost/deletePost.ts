import Post from '../../../models/postModel';
import { Request, Response, NextFunction } from 'express';

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

export default deletePost;
