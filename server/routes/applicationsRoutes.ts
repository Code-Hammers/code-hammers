import express from 'express';
import {
  createApplication,
  getAllApplications,
  getStatuses,
  updateApplication,
  getApplicationById,
  getAggregatedUserStats,
  updateNotificationPeriod,
  pauseNotifications,
} from '../controllers/applicationsController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/aggregated-user-stats/:userId', protect, getAggregatedUserStats);
router.get('/statuses', protect, getStatuses);
router.get('/', protect, getAllApplications);
router.get('/:id', protect, getApplicationById);
router.post('/', protect, createApplication);
router.put('/:id', protect, updateApplication);
router.put('/:id/notification-period', protect, updateNotificationPeriod);
router.put('/:id/pause-notifications', protect, pauseNotifications);

export default router;
