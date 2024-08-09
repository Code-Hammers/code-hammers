import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createApplication,
  getAllApplications,
  getStatuses,
  updateApplication,
  getApplicationById,
  getAggregatedUserStats,
  updateNotificationPeriod,
  pauseNotifications,
} from '../controllers/applicationController';

const router = express.Router();

router.use(protect); /* Require Auth for ALL routes below */
router.get('/aggregated-user-stats/:userId', getAggregatedUserStats);
router.get('/statuses', getStatuses);
router.get('/', getAllApplications);
router.get('/:id', getApplicationById);
router.post('/', createApplication);
router.put('/:id', updateApplication);
router.put('/:id/notification-period', updateNotificationPeriod);
router.put('/:id/pause-notifications', pauseNotifications);

export default router;
