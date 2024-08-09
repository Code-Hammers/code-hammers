//import Post from '../../../models/postModel'; will be need when refactored
import Thread from '../../../models/threadModel';
import { Request, Response, NextFunction } from 'express';

//TODO when deleting thread, all posts from that thread should be deleted as well

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

export default deleteThread;
