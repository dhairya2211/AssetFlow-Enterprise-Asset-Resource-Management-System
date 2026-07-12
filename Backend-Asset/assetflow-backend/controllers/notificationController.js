const NotificationModel = require('../models/notificationModel');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const {
  filterNotifications,
  searchNotifications,
  paginateNotifications
} = require('../services/notificationService');

/**
 * Get notifications for current user
 */
const getNotifications = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, type, read } = req.query;
    let notifications = await NotificationModel.getByUser(req.user.id);

    // Apply filters
    notifications = filterNotifications(notifications, { type, read });

    // Apply search
    if (search) {
      notifications = searchNotifications(notifications, search);
    }

    // Apply pagination
    const result = paginateNotifications(notifications, page, limit);

    return successResponse(res, 'Notifications retrieved successfully', result);
  } catch (error) {
    console.error('Get notifications error:', error);
    return errorResponse(res, 'Failed to retrieve notifications', null, 500);
  }
};

/**
 * Get unread notifications for current user
 */
const getUnreadNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let notifications = await NotificationModel.getUnreadByUser(req.user.id);

    // Apply pagination
    const result = paginateNotifications(notifications, page, limit);

    return successResponse(res, 'Unread notifications retrieved successfully', result);
  } catch (error) {
    console.error('Get unread notifications error:', error);
    return errorResponse(res, 'Failed to retrieve unread notifications', null, 500);
  }
};

/**
 * Mark notification as read
 */
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await NotificationModel.getById(id);
    if (!notification) {
      return errorResponse(res, 'Notification not found', null, 404);
    }

    // Check if the notification belongs to the current user
    if (notification.user_id !== req.user.id) {
      return errorResponse(res, 'Unauthorized', null, 403);
    }

    await NotificationModel.markAsRead(id);

    return successResponse(res, 'Notification marked as read');
  } catch (error) {
    console.error('Mark as read error:', error);
    return errorResponse(res, 'Failed to mark notification as read', null, 500);
  }
};

/**
 * Mark all notifications as read for current user
 */
const markAllAsRead = async (req, res) => {
  try {
    await NotificationModel.markAllAsReadForUser(req.user.id);
    return successResponse(res, 'All notifications marked as read');
  } catch (error) {
    console.error('Mark all as read error:', error);
    return errorResponse(res, 'Failed to mark all notifications as read', null, 500);
  }
};

/**
 * Delete notification
 */
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await NotificationModel.getById(id);
    if (!notification) {
      return errorResponse(res, 'Notification not found', null, 404);
    }

    // Check if the notification belongs to the current user
    if (notification.user_id !== req.user.id) {
      return errorResponse(res, 'Unauthorized', null, 403);
    }

    await NotificationModel.delete(id);

    return successResponse(res, 'Notification deleted');
  } catch (error) {
    console.error('Delete notification error:', error);
    return errorResponse(res, 'Failed to delete notification', null, 500);
  }
};

module.exports = {
  getNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
};
