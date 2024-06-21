import Thread from '../../../models/threadModel';
import { Request, Response, NextFunction } from 'express';

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

    const updatedThread = await Thread.findByIdAndUpdate(
      threadId,
      { $set: { title, content } },
      { new: true, runValidators: true },
    ).populate('user', 'firstName lastName');

    res.status(200).json(updatedThread);
  } catch (error) {
    next({
      log: `Express error in updateThread controller: ${error}`,
      status: 500,
      message: { err: 'Server error updating thread' },
    });
  }
};

export default updateThread;
