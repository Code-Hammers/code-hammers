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

router.get('/threads', protect, getAllThreads);
router.get('/threads/:threadId', protect, getThreadById);

//Forum Routes
router.post('/', protect, addForum); //TODO Protect with admin auth
router.get('/', protect, getAllForums);
router.get('/:forumId', protect, getForumById);
router.put('/:forumId', protect, updateForum); //TODO Protect with admin auth
router.delete('/:forumId', protect, deleteForum); //TODO Protect with admin auth

//Thread Routes

router.post('/:forumId/threads', protect, createThread);
router.get('/:forumId/threads', protect, listThreadsByForumId);
router.get('/:forumId/threads/:threadId', protect, getThreadById);
router.put('/:forumId/threads/:threadId', protect, updateThread);
router.delete('/:forumId/threads/:threadId', protect, deleteThread); //TODO Protect with admin auth

//Post Routes
router.get('/:forumId/threads/:threadId/posts', protect, listPostsByThreadId);
router.post('/:forumId/threads/:threadId/posts', protect, createPost);
router.put('/:forumId/threads/:threadId/posts/:postId', protect, updatePost);
router.delete('/:forumId/threads/:threadId/posts/:postId', protect, deletePost); //TODO Protect with admin auth

export default router;
