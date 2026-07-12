const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticate } = require('../middleware/roleMiddleware');
const { notificationIdValidation, notificationQueryValidation } = require('../validators/notificationValidator');

/**
 * @route   GET /api/v1/notifications
 * @desc    Get notifications for current user
 * @access  Private (Authenticated)
 */
router.get('/', authenticate, notificationQueryValidation, notificationController.getNotifications);

/**
 * @route   GET /api/v1/notifications/unread
 * @desc    Get unread notifications for current user
 * @access  Private (Authenticated)
 */
router.get('/unread', authenticate, notificationController.getUnreadNotifications);

/**
 * @route   PATCH /api/v1/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private (Authenticated)
 */
router.patch('/:id/read', authenticate, notificationIdValidation, notificationController.markAsRead);

/**
 * @route   PATCH /api/v1/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Private (Authenticated)
 */
router.patch('/read-all', authenticate, notificationController.markAllAsRead);

/**
 * @route   DELETE /api/v1/notifications/:id
 * @desc    Delete notification
 * @access  Private (Authenticated)
 */
router.delete('/:id', authenticate, notificationIdValidation, notificationController.deleteNotification);

module.exports = router;
