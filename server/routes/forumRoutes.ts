import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  addForum,
  deleteForum,
  getAllForums,
  getForumById,
  updateForum,
} from '../controllers/forumController';
import {
  createThread,
  deleteThread,
  getThreadById,
  listThreadsByForumId,
  updateThread,
  getAllThreads,
} from '../controllers/threadController';
import {
  listPostsByThreadId,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController';

const router = express.Router();

router.use(protect); /* Require Auth for ALL routes below */

router.get('/threads', getAllThreads);
router.get('/threads/:threadId', getThreadById);

//Forum Routes
router.post('/', addForum); //TODO Protect with admin auth
router.get('/', getAllForums);
router.get('/:forumId', getForumById);
router.put('/:forumId', updateForum); //TODO Protect with admin auth
router.delete('/:forumId', deleteForum); //TODO Protect with admin auth

//Thread Routes

router.post('/:forumId/threads', createThread);
router.get('/:forumId/threads', listThreadsByForumId);
router.get('/:forumId/threads/:threadId', getThreadById);
router.put('/:forumId/threads/:threadId', updateThread);
router.delete('/:forumId/threads/:threadId', deleteThread); //TODO Protect with admin auth

//Post Routes
router.get('/:forumId/threads/:threadId/posts', listPostsByThreadId);
router.post('/:forumId/threads/:threadId/posts', createPost);
router.put('/:forumId/threads/:threadId/posts/:postId', updatePost);
router.delete('/:forumId/threads/:threadId/posts/:postId', deletePost); //TODO Protect with admin auth

export default router;
