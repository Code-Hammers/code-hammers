import Forum from '../../../models/forumModel';
import { Request, Response, NextFunction } from 'express';

// ENDPOINT  DELETE api/forums/:forumId
// PURPOSE   Delete a forum
// ACCESS    Admin
const deleteForum = async (req: Request, res: Response, next: NextFunction) => {
  const { forumId } = req.params;

  try {
    //TODO add auth check for admin status

    const deletedForum = await Forum.findByIdAndDelete(forumId);

    if (!deletedForum) {
      return res.status(404).json({ message: 'Forum not found' });
    }

    res.status(200).json({ message: 'Forum deleted successfully' });
  } catch (error) {
    next({
      log: `Express error in deleteForum controller: ${error}`,
      status: 500,
      message: { err: 'Server error deleting forum' },
    });
  }
};

export default deleteForum;
