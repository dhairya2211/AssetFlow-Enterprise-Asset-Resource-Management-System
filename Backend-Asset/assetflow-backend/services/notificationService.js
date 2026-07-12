const NotificationModel = require('../models/notificationModel');

/**
 * Filter notifications
 */
const filterNotifications = (notifications, filters) => {
  let filtered = [...notifications];

  // Filter by type
  if (filters.type) {
    filtered = filtered.filter(n => n.type === filters.type);
  }

  // Filter by read status
  if (typeof filters.read !== 'undefined') {
    filtered = filtered.filter(n => n.is_read === filters.read);
  }

  return filtered;
};

/**
 * Search notifications
 */
const searchNotifications = (notifications, searchTerm) => {
  if (!searchTerm) return notifications;

  const term = searchTerm.toLowerCase();
  return notifications.filter(n =>
    n.title?.toLowerCase().includes(term) ||
    n.message?.toLowerCase().includes(term)
  );
};

/**
 * Paginate notifications
 */
const paginateNotifications = (notifications, page = 1, limit = 10) => {
  const total = notifications.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedNotifications = notifications.slice(startIndex, endIndex);

  return {
    notifications: paginatedNotifications,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Create notification
 */
const createNotification = async (notificationData) => {
  try {
    const notificationId = await NotificationModel.create(notificationData);
    return notificationId;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

/**
 * Notify users (can be used by other services to send notifications)
 */
const notify = async (userIds, title, message, type = 'system') => {
  try {
    const notifications = userIds.map(userId => ({
      user_id: userId,
      title,
      message,
      type
    }));
    await NotificationModel.createBulk(notifications);
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error;
  }
};

module.exports = {
  filterNotifications,
  searchNotifications,
  paginateNotifications,
  createNotification,
  notify
};
