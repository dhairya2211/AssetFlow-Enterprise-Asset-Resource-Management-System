const { pool } = require('../config/database');

const TransferRequestModel = {
  /**
   * Get all transfer requests
   */
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT tr.*, 
             a.asset_name, a.asset_tag, 
             from_user.full_name as from_user_name, from_user.employee_id as from_employee_id,
             to_user.full_name as to_user_name, to_user.employee_id as to_employee_id,
             approved_user.full_name as approved_by_name
      FROM transfer_requests tr
      JOIN assets a ON tr.asset_id = a.id
      JOIN users from_user ON tr.from_user = from_user.id
      JOIN users to_user ON tr.to_user = to_user.id
      LEFT JOIN users approved_user ON tr.approved_by = approved_user.id
      ORDER BY tr.created_at DESC
    `);
    return rows;
  },

  /**
   * Get transfer request by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT tr.*, 
             a.asset_name, a.asset_tag, 
             from_user.full_name as from_user_name, from_user.employee_id as from_employee_id,
             to_user.full_name as to_user_name, to_user.employee_id as to_employee_id,
             approved_user.full_name as approved_by_name
      FROM transfer_requests tr
      JOIN assets a ON tr.asset_id = a.id
      JOIN users from_user ON tr.from_user = from_user.id
      JOIN users to_user ON tr.to_user = to_user.id
      LEFT JOIN users approved_user ON tr.approved_by = approved_user.id
      WHERE tr.id = ?
    `, [id]);
    return rows[0];
  },

  /**
   * Get transfer requests by asset
   */
  getByAsset: async (assetId) => {
    const [rows] = await pool.query(`
      SELECT tr.*, 
             a.asset_name, a.asset_tag, 
             from_user.full_name as from_user_name, from_user.employee_id as from_employee_id,
             to_user.full_name as to_user_name, to_user.employee_id as to_employee_id,
             approved_user.full_name as approved_by_name
      FROM transfer_requests tr
      JOIN assets a ON tr.asset_id = a.id
      JOIN users from_user ON tr.from_user = from_user.id
      JOIN users to_user ON tr.to_user = to_user.id
      LEFT JOIN users approved_user ON tr.approved_by = approved_user.id
      WHERE tr.asset_id = ?
      ORDER BY tr.created_at DESC
    `, [assetId]);
    return rows;
  },

  /**
   * Get transfer requests by from user
   */
  getByFromUser: async (fromUserId) => {
    const [rows] = await pool.query(`
      SELECT tr.*, 
             a.asset_name, a.asset_tag, 
             from_user.full_name as from_user_name, from_user.employee_id as from_employee_id,
             to_user.full_name as to_user_name, to_user.employee_id as to_employee_id,
             approved_user.full_name as approved_by_name
      FROM transfer_requests tr
      JOIN assets a ON tr.asset_id = a.id
      JOIN users from_user ON tr.from_user = from_user.id
      JOIN users to_user ON tr.to_user = to_user.id
      LEFT JOIN users approved_user ON tr.approved_by = approved_user.id
      WHERE tr.from_user = ?
      ORDER BY tr.created_at DESC
    `, [fromUserId]);
    return rows;
  },

  /**
   * Get transfer requests by to user
   */
  getByToUser: async (toUserId) => {
    const [rows] = await pool.query(`
      SELECT tr.*, 
             a.asset_name, a.asset_tag, 
             from_user.full_name as from_user_name, from_user.employee_id as from_employee_id,
             to_user.full_name as to_user_name, to_user.employee_id as to_employee_id,
             approved_user.full_name as approved_by_name
      FROM transfer_requests tr
      JOIN assets a ON tr.asset_id = a.id
      JOIN users from_user ON tr.from_user = from_user.id
      JOIN users to_user ON tr.to_user = to_user.id
      LEFT JOIN users approved_user ON tr.approved_by = approved_user.id
      WHERE tr.to_user = ?
      ORDER BY tr.created_at DESC
    `, [toUserId]);
    return rows;
  },

  /**
   * Get pending transfer requests
   */
  getPending: async () => {
    const [rows] = await pool.query(`
      SELECT tr.*, 
             a.asset_name, a.asset_tag, 
             from_user.full_name as from_user_name, from_user.employee_id as from_employee_id,
             to_user.full_name as to_user_name, to_user.employee_id as to_employee_id,
             approved_user.full_name as approved_by_name
      FROM transfer_requests tr
      JOIN assets a ON tr.asset_id = a.id
      JOIN users from_user ON tr.from_user = from_user.id
      JOIN users to_user ON tr.to_user = to_user.id
      LEFT JOIN users approved_user ON tr.approved_by = approved_user.id
      WHERE tr.status = 'pending'
      ORDER BY tr.created_at DESC
    `);
    return rows;
  },

  /**
   * Create new transfer request
   */
  create: async (transfer) => {
    const [result] = await pool.query(
      'INSERT INTO transfer_requests (asset_id, from_user, to_user, reason, status) VALUES (?, ?, ?, ?, ?)',
      [
        transfer.asset_id,
        transfer.from_user,
        transfer.to_user,
        transfer.reason || null,
        transfer.status || 'pending'
      ]
    );
    return result.insertId;
  },

  /**
   * Update transfer request
   */
  update: async (id, transfer) => {
    const [result] = await pool.query(
      'UPDATE transfer_requests SET reason = ? WHERE id = ?',
      [transfer.reason, id]
    );
    return result.affectedRows;
  },

  /**
   * Approve transfer request
   */
  approve: async (id, approvedBy) => {
    const [result] = await pool.query(
      'UPDATE transfer_requests SET status = ?, approved_by = ?, approved_at = CURRENT_TIMESTAMP WHERE id = ?',
      ['approved', approvedBy, id]
    );
    return result.affectedRows;
  },

  /**
   * Reject transfer request
   */
  reject: async (id, approvedBy) => {
    const [result] = await pool.query(
      'UPDATE transfer_requests SET status = ?, approved_by = ?, approved_at = CURRENT_TIMESTAMP WHERE id = ?',
      ['rejected', approvedBy, id]
    );
    return result.affectedRows;
  },

  /**
   * Update transfer request status
   */
  updateStatus: async (id, status) => {
    const [result] = await pool.query('UPDATE transfer_requests SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  },

  /**
   * Delete transfer request
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM transfer_requests WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = TransferRequestModel;
