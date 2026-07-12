const { pool } = require('../config/database');

const MaintenanceRequestModel = {
  /**
   * Get all maintenance requests
   */
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT mr.*, 
             a.asset_name, a.asset_tag, 
             requested_by_user.full_name as requested_by_name, requested_by_user.employee_id as requested_by_employee_id,
             assigned_to_user.full_name as assigned_to_name, assigned_to_user.employee_id as assigned_to_employee_id
      FROM maintenance_requests mr
      JOIN assets a ON mr.asset_id = a.id
      JOIN users requested_by_user ON mr.requested_by = requested_by_user.id
      LEFT JOIN users assigned_to_user ON mr.assigned_to = assigned_to_user.id
      ORDER BY mr.created_at DESC
    `);
    return rows;
  },

  /**
   * Get maintenance request by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT mr.*, 
             a.asset_name, a.asset_tag, 
             requested_by_user.full_name as requested_by_name, requested_by_user.employee_id as requested_by_employee_id,
             assigned_to_user.full_name as assigned_to_name, assigned_to_user.employee_id as assigned_to_employee_id
      FROM maintenance_requests mr
      JOIN assets a ON mr.asset_id = a.id
      JOIN users requested_by_user ON mr.requested_by = requested_by_user.id
      LEFT JOIN users assigned_to_user ON mr.assigned_to = assigned_to_user.id
      WHERE mr.id = ?
    `, [id]);
    return rows[0];
  },

  /**
   * Get maintenance requests by asset
   */
  getByAsset: async (assetId) => {
    const [rows] = await pool.query(`
      SELECT mr.*, 
             a.asset_name, a.asset_tag, 
             requested_by_user.full_name as requested_by_name, requested_by_user.employee_id as requested_by_employee_id,
             assigned_to_user.full_name as assigned_to_name, assigned_to_user.employee_id as assigned_to_employee_id
      FROM maintenance_requests mr
      JOIN assets a ON mr.asset_id = a.id
      JOIN users requested_by_user ON mr.requested_by = requested_by_user.id
      LEFT JOIN users assigned_to_user ON mr.assigned_to = assigned_to_user.id
      WHERE mr.asset_id = ?
      ORDER BY mr.created_at DESC
    `, [assetId]);
    return rows;
  },

  /**
   * Get maintenance requests by requested by user
   */
  getByRequestedBy: async (requestedBy) => {
    const [rows] = await pool.query(`
      SELECT mr.*, 
             a.asset_name, a.asset_tag, 
             requested_by_user.full_name as requested_by_name, requested_by_user.employee_id as requested_by_employee_id,
             assigned_to_user.full_name as assigned_to_name, assigned_to_user.employee_id as assigned_to_employee_id
      FROM maintenance_requests mr
      JOIN assets a ON mr.asset_id = a.id
      JOIN users requested_by_user ON mr.requested_by = requested_by_user.id
      LEFT JOIN users assigned_to_user ON mr.assigned_to = assigned_to_user.id
      WHERE mr.requested_by = ?
      ORDER BY mr.created_at DESC
    `, [requestedBy]);
    return rows;
  },

  /**
   * Get maintenance requests by assigned to user
   */
  getByAssignedTo: async (assignedTo) => {
    const [rows] = await pool.query(`
      SELECT mr.*, 
             a.asset_name, a.asset_tag, 
             requested_by_user.full_name as requested_by_name, requested_by_user.employee_id as requested_by_employee_id,
             assigned_to_user.full_name as assigned_to_name, assigned_to_user.employee_id as assigned_to_employee_id
      FROM maintenance_requests mr
      JOIN assets a ON mr.asset_id = a.id
      JOIN users requested_by_user ON mr.requested_by = requested_by_user.id
      LEFT JOIN users assigned_to_user ON mr.assigned_to = assigned_to_user.id
      WHERE mr.assigned_to = ?
      ORDER BY mr.created_at DESC
    `, [assignedTo]);
    return rows;
  },

  /**
   * Get maintenance requests by status
   */
  getByStatus: async (status) => {
    const [rows] = await pool.query(`
      SELECT mr.*, 
             a.asset_name, a.asset_tag, 
             requested_by_user.full_name as requested_by_name, requested_by_user.employee_id as requested_by_employee_id,
             assigned_to_user.full_name as assigned_to_name, assigned_to_user.employee_id as assigned_to_employee_id
      FROM maintenance_requests mr
      JOIN assets a ON mr.asset_id = a.id
      JOIN users requested_by_user ON mr.requested_by = requested_by_user.id
      LEFT JOIN users assigned_to_user ON mr.assigned_to = assigned_to_user.id
      WHERE mr.status = ?
      ORDER BY mr.created_at DESC
    `, [status]);
    return rows;
  },

  /**
   * Get maintenance requests by priority
   */
  getByPriority: async (priority) => {
    const [rows] = await pool.query(`
      SELECT mr.*, 
             a.asset_name, a.asset_tag, 
             requested_by_user.full_name as requested_by_name, requested_by_user.employee_id as requested_by_employee_id,
             assigned_to_user.full_name as assigned_to_name, assigned_to_user.employee_id as assigned_to_employee_id
      FROM maintenance_requests mr
      JOIN assets a ON mr.asset_id = a.id
      JOIN users requested_by_user ON mr.requested_by = requested_by_user.id
      LEFT JOIN users assigned_to_user ON mr.assigned_to = assigned_to_user.id
      WHERE mr.priority = ?
      ORDER BY mr.created_at DESC
    `, [priority]);
    return rows;
  },

  /**
   * Get pending maintenance requests
   */
  getPending: async () => {
    const [rows] = await pool.query(`
      SELECT mr.*, 
             a.asset_name, a.asset_tag, 
             requested_by_user.full_name as requested_by_name, requested_by_user.employee_id as requested_by_employee_id,
             assigned_to_user.full_name as assigned_to_name, assigned_to_user.employee_id as assigned_to_employee_id
      FROM maintenance_requests mr
      JOIN assets a ON mr.asset_id = a.id
      JOIN users requested_by_user ON mr.requested_by = requested_by_user.id
      LEFT JOIN users assigned_to_user ON mr.assigned_to = assigned_to_user.id
      WHERE mr.status = 'pending'
      ORDER BY mr.priority DESC, mr.created_at ASC
    `);
    return rows;
  },

  /**
   * Create new maintenance request
   */
  create: async (maintenance, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query(
      'INSERT INTO maintenance_requests (asset_id, requested_by, issue, priority, status, assigned_to) VALUES (?, ?, ?, ?, ?, ?)',
      [
        maintenance.asset_id,
        maintenance.requested_by,
        maintenance.issue,
        maintenance.priority || 'medium',
        maintenance.status || 'pending',
        maintenance.assigned_to || null
      ]
    );
    return result.insertId;
  },

  /**
   * Update maintenance request
   */
  update: async (id, maintenance, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query(
      'UPDATE maintenance_requests SET issue = ?, priority = ?, assigned_to = ? WHERE id = ?',
      [maintenance.issue, maintenance.priority, maintenance.assigned_to, id]
    );
    return result.affectedRows;
  },

  /**
   * Assign maintenance request
   */
  assign: async (id, assignedTo, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query(
      'UPDATE maintenance_requests SET assigned_to = ?, status = ? WHERE id = ?',
      [assignedTo, 'in_progress', id]
    );
    return result.affectedRows;
  },

  /**
   * Resolve maintenance request
   */
  resolve: async (id, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query(
      'UPDATE maintenance_requests SET status = ?, resolved_at = CURRENT_TIMESTAMP WHERE id = ?',
      ['resolved', id]
    );
    return result.affectedRows;
  },

  /**
   * Update maintenance request status
   */
  updateStatus: async (id, status) => {
    const [result] = await pool.query('UPDATE maintenance_requests SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  },

  /**
   * Delete maintenance request
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM maintenance_requests WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = MaintenanceRequestModel;
