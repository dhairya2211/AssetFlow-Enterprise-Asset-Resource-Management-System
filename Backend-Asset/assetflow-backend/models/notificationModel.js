const { pool } = require('../config/database');

const NotificationModel = {
  /**
   * Get all notifications
   */
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT n.*, u.full_name, u.employee_id
      FROM notifications n
      JOIN users u ON n.user_id = u.id
      ORDER BY n.created_at DESC
    `);
    return rows;
  },

  /**
   * Get notification by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT n.*, u.full_name, u.employee_id
      FROM notifications n
      JOIN users u ON n.user_id = u.id
      WHERE n.id = ?
    `, [id]);
    return rows[0];
  },

  /**
   * Get notifications by user
   */
  getByUser: async (userId) => {
    const [rows] = await pool.query(`
      SELECT n.*, u.full_name, u.employee_id
      FROM notifications n
      JOIN users u ON n.user_id = u.id
      WHERE n.user_id = ?
      ORDER BY n.created_at DESC
    `, [userId]);
    return rows;
  },

  /**
   * Get unread notifications by user
   */
  getUnreadByUser: async (userId) => {
    const [rows] = await pool.query(`
      SELECT n.*, u.full_name, u.employee_id
      FROM notifications n
      JOIN users u ON n.user_id = u.id
      WHERE n.user_id = ? AND n.is_read = false
      ORDER BY n.created_at DESC
    `, [userId]);
    return rows;
  },

  /**
   * Get notifications by type
   */
  getByType: async (type) => {
    const [rows] = await pool.query(`
      SELECT n.*, u.full_name, u.employee_id
      FROM notifications n
      JOIN users u ON n.user_id = u.id
      WHERE n.type = ?
      ORDER BY n.created_at DESC
    `, [type]);
    return rows;
  },

  /**
   * Get read/unread notifications
   */
  getByReadStatus: async (isRead) => {
    const [rows] = await pool.query(`
      SELECT n.*, u.full_name, u.employee_id
      FROM notifications n
      JOIN users u ON n.user_id = u.id
      WHERE n.is_read = ?
      ORDER BY n.created_at DESC
    `, [isRead]);
    return rows;
  },

  /**
   * Get recent notifications (last N days)
   */
  getRecent: async (days = 7) => {
    const [rows] = await pool.query(`
      SELECT n.*, u.full_name, u.employee_id
      FROM notifications n
      JOIN users u ON n.user_id = u.id
      WHERE n.created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      ORDER BY n.created_at DESC
    `, [days]);
    return rows;
  },

  /**
   * Create new notification
   */
  create: async (notification) => {
    const [result] = await pool.query(
      'INSERT INTO notifications (user_id, title, message, type, is_read) VALUES (?, ?, ?, ?, ?)',
      [
        notification.user_id,
        notification.title,
        notification.message,
        notification.type || 'system',
        notification.is_read || false
      ]
    );
    return result.insertId;
  },

  /**
   * Create bulk notifications for multiple users
   */
  createBulk: async (notifications) => {
    const values = notifications.map(n => [
      n.user_id,
      n.title,
      n.message,
      n.type || 'system',
      n.is_read || false
    ]);
    const [result] = await pool.query(
      'INSERT INTO notifications (user_id, title, message, type, is_read) VALUES ?',
      [values]
    );
    return result.affectedRows;
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (id) => {
    const [result] = await pool.query('UPDATE notifications SET is_read = true WHERE id = ?', [id]);
    return result.affectedRows;
  },

  /**
   * Mark all notifications as read for a user
   */
  markAllAsReadForUser: async (userId) => {
    const [result] = await pool.query('UPDATE notifications SET is_read = true WHERE user_id = ?', [userId]);
    return result.affectedRows;
  },

  /**
   * Update notification
   */
  update: async (id, notification) => {
    const [result] = await pool.query(
      'UPDATE notifications SET title = ?, message = ?, type = ? WHERE id = ?',
      [notification.title, notification.message, notification.type, id]
    );
    return result.affectedRows;
  },

  /**
   * Delete notification
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM notifications WHERE id = ?', [id]);
    return result.affectedRows;
  },

  /**
   * Delete old notifications (older than N days)
   */
  deleteOld: async (days = 30) => {
    const [result] = await pool.query(
      'DELETE FROM notifications WHERE created_at < DATE_SUB(CURDATE(), INTERVAL ? DAY)',
      [days]
    );
    return result.affectedRows;
  },

  /**
   * Delete all notifications for a user
   */
  deleteByUser: async (userId) => {
    const [result] = await pool.query('DELETE FROM notifications WHERE user_id = ?', [userId]);
    return result.affectedRows;
  }
};

module.exports = NotificationModel;
