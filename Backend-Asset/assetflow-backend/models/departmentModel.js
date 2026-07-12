const { pool } = require('../config/database');

const DepartmentModel = {
  /**
   * Get all departments
   */
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM departments ORDER BY name');
    return rows;
  },

  /**
   * Get department by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM departments WHERE id = ?', [id]);
    return rows[0];
  },

  /**
   * Create new department
   */
  create: async (department) => {
    const [result] = await pool.query(
      'INSERT INTO departments (name, description, status) VALUES (?, ?, ?)',
      [department.name, department.description, department.status || 'active']
    );
    return result.insertId;
  },

  /**
   * Update department
   */
  update: async (id, department) => {
    const [result] = await pool.query(
      'UPDATE departments SET name = ?, description = ?, status = ? WHERE id = ?',
      [department.name, department.description, department.status, id]
    );
    return result.affectedRows;
  },

  /**
   * Delete department
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM departments WHERE id = ?', [id]);
    return result.affectedRows;
  },

  /**
   * Get active departments
   */
  getActive: async () => {
    const [rows] = await pool.query('SELECT * FROM departments WHERE status = ? ORDER BY name', ['active']);
    return rows;
  }
};

module.exports = DepartmentModel;
