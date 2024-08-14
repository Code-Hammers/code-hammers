import Forum from '../../../models/forumModel';
import { Request, Response, NextFunction } from 'express';

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
      { new: true },
    );

    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }

    res.status(200).json(forum);
  } catch (error) {
    next({
      log: `Express error in updateForum controller: ${error}`,
      status: 500,
      message: { err: 'Server error updating forum details' },
    });
  }
};

export default updateForum;
