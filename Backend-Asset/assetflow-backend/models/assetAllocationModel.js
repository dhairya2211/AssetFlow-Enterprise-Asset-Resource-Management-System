const { pool } = require('../config/database');

const AssetAllocationModel = {
  /**
   * Get all allocations
   */
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT aa.*, 
             a.asset_name, a.asset_tag, a.department_id,
             u.full_name, u.employee_id,
             d.name as department_name
      FROM asset_allocations aa
      JOIN assets a ON aa.asset_id = a.id
      JOIN users u ON aa.user_id = u.id
      LEFT JOIN departments d ON a.department_id = d.id
      ORDER BY aa.allocated_date DESC
    `);
    return rows;
  },

  /**
   * Get allocation by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT aa.*, 
             a.asset_name, a.asset_tag, a.department_id,
             u.full_name, u.employee_id,
             d.name as department_name
      FROM asset_allocations aa
      JOIN assets a ON aa.asset_id = a.id
      JOIN users u ON aa.user_id = u.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE aa.id = ?
    `, [id]);
    return rows[0];
  },

  /**
   * Get allocations by asset
   */
  getByAsset: async (assetId) => {
    const [rows] = await pool.query(`
      SELECT aa.*, 
             a.asset_name, a.asset_tag, a.department_id,
             u.full_name, u.employee_id,
             d.name as department_name
      FROM asset_allocations aa
      JOIN assets a ON aa.asset_id = a.id
      JOIN users u ON aa.user_id = u.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE aa.asset_id = ?
      ORDER BY aa.allocated_date DESC
    `, [assetId]);
    return rows;
  },

  /**
   * Get allocations by user
   */
  getByUser: async (userId) => {
    const [rows] = await pool.query(`
      SELECT aa.*, 
             a.asset_name, a.asset_tag, a.department_id,
             u.full_name, u.employee_id,
             d.name as department_name
      FROM asset_allocations aa
      JOIN assets a ON aa.asset_id = a.id
      JOIN users u ON aa.user_id = u.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE aa.user_id = ?
      ORDER BY aa.allocated_date DESC
    `, [userId]);
    return rows;
  },

  /**
   * Get active allocations
   */
  getActive: async () => {
    const [rows] = await pool.query(`
      SELECT aa.*, 
             a.asset_name, a.asset_tag, a.department_id,
             u.full_name, u.employee_id,
             d.name as department_name
      FROM asset_allocations aa
      JOIN assets a ON aa.asset_id = a.id
      JOIN users u ON aa.user_id = u.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE aa.status = 'active'
      ORDER BY aa.allocated_date DESC
    `);
    return rows;
  },

  /**
   * Get overdue allocations
   */
  getOverdue: async () => {
    const [rows] = await pool.query(`
      SELECT aa.*, 
             a.asset_name, a.asset_tag, a.department_id,
             u.full_name, u.employee_id,
             d.name as department_name
      FROM asset_allocations aa
      JOIN assets a ON aa.asset_id = a.id
      JOIN users u ON aa.user_id = u.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE aa.status = 'active' AND aa.expected_return < CURDATE()
      ORDER BY aa.expected_return ASC
    `);
    return rows;
  },

  /**
   * Create new allocation
   */
  create: async (allocation, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query(
      'INSERT INTO asset_allocations (asset_id, user_id, allocated_date, expected_return, status, remarks) VALUES (?, ?, ?, ?, ?, ?)',
      [
        allocation.asset_id,
        allocation.user_id,
        allocation.allocated_date,
        allocation.expected_return || null,
        allocation.status || 'active',
        allocation.remarks || null
      ]
    );
    return result.insertId;
  },

  /**
   * Update allocation
   */
  update: async (id, allocation) => {
    const [result] = await pool.query(
      'UPDATE asset_allocations SET expected_return = ?, remarks = ? WHERE id = ?',
      [allocation.expected_return, allocation.remarks, id]
    );
    return result.affectedRows;
  },

  /**
   * Return asset (update allocation with return date)
   */
  returnAsset: async (id, returnDate = null, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query(
      'UPDATE asset_allocations SET returned_date = ?, status = ? WHERE id = ?',
      [returnDate || new Date().toISOString().split('T')[0], 'returned', id]
    );
    return result.affectedRows;
  },

  /**
   * Update allocation owner (used during transfer approval)
   */
  updateOwner: async (id, userId, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query(
      'UPDATE asset_allocations SET user_id = ? WHERE id = ?',
      [userId, id]
    );
    return result.affectedRows;
  },

  /**
   * Update allocation status
   */
  updateStatus: async (id, status) => {
    const [result] = await pool.query('UPDATE asset_allocations SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  },

  /**
   * Delete allocation
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM asset_allocations WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = AssetAllocationModel;
