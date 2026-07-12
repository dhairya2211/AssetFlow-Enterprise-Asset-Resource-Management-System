const { pool } = require('../config/database');

const AuditModel = {
  /**
   * Get all audits
   */
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT a.*, d.name as department_name
      FROM audits a
      LEFT JOIN departments d ON a.department_id = d.id
      ORDER BY a.start_date DESC
    `);
    return rows;
  },

  /**
   * Get audit by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT a.*, d.name as department_name
      FROM audits a
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.id = ?
    `, [id]);
    return rows[0];
  },

  /**
   * Get audits by department
   */
  getByDepartment: async (departmentId) => {
    const [rows] = await pool.query(`
      SELECT a.*, d.name as department_name
      FROM audits a
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.department_id = ?
      ORDER BY a.start_date DESC
    `, [departmentId]);
    return rows;
  },

  /**
   * Get audits by status
   */
  getByStatus: async (status) => {
    const [rows] = await pool.query(`
      SELECT a.*, d.name as department_name
      FROM audits a
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.status = ?
      ORDER BY a.start_date DESC
    `, [status]);
    return rows;
  },

  /**
   * Get active audits
   */
  getActive: async () => {
    const [rows] = await pool.query(`
      SELECT a.*, d.name as department_name
      FROM audits a
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.status IN ('scheduled', 'in_progress')
      ORDER BY a.start_date ASC
    `);
    return rows;
  },

  /**
   * Create new audit
   */
  create: async (audit) => {
    const [result] = await pool.query(
      'INSERT INTO audits (audit_name, department_id, auditor, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [
        audit.audit_name,
        audit.department_id || null,
        audit.auditor,
        audit.start_date,
        audit.end_date || null,
        audit.status || 'scheduled'
      ]
    );
    return result.insertId;
  },

  /**
   * Update audit
   */
  update: async (id, audit) => {
    const [result] = await pool.query(
      'UPDATE audits SET audit_name = ?, department_id = ?, auditor = ?, start_date = ?, end_date = ? WHERE id = ?',
      [audit.audit_name, audit.department_id, audit.auditor, audit.start_date, audit.end_date, id]
    );
    return result.affectedRows;
  },

  /**
   * Update audit status
   */
  updateStatus: async (id, status) => {
    const [result] = await pool.query('UPDATE audits SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  },

  /**
   * Delete audit
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM audits WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = AuditModel;
