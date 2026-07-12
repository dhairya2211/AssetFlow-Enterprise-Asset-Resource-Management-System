const { pool } = require('../config/database');

const UserModel = {
  /**
   * Get all users
   */
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT u.*, d.name as department_name 
      FROM users u 
      LEFT JOIN departments d ON u.department_id = d.id 
      ORDER BY u.full_name
    `);
    return rows;
  },

  /**
   * Get user by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT u.*, d.name as department_name 
      FROM users u 
      LEFT JOIN departments d ON u.department_id = d.id 
      WHERE u.id = ?
    `, [id]);
    return rows[0];
  },

  /**
   * Get user by email
   */
  getByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  /**
   * Get user by employee ID
   */
  getByEmployeeId: async (employeeId) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE employee_id = ?', [employeeId]);
    return rows[0];
  },

  /**
   * Create new user
   */
  create: async (user) => {
    const [result] = await pool.query(
      'INSERT INTO users (employee_id, full_name, email, password, role, department_id, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        user.employee_id,
        user.full_name,
        user.email,
        user.password,
        user.role || 'employee',
        user.department_id || null,
        user.phone || null,
        user.status || 'active'
      ]
    );
    return result.insertId;
  },

  /**
   * Update user
   */
  update: async (id, user) => {
    const [result] = await pool.query(
      'UPDATE users SET employee_id = ?, full_name = ?, email = ?, role = ?, department_id = ?, phone = ?, status = ? WHERE id = ?',
      [
        user.employee_id,
        user.full_name,
        user.email,
        user.role,
        user.department_id,
        user.phone,
        user.status,
        id
      ]
    );
    return result.affectedRows;
  },

  /**
   * Update user password
   */
  updatePassword: async (id, password) => {
    const [result] = await pool.query('UPDATE users SET password = ? WHERE id = ?', [password, id]);
    return result.affectedRows;
  },

  /**
   * Delete user
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows;
  },

  /**
   * Get users by department
   */
  getByDepartment: async (departmentId) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE department_id = ? ORDER BY full_name', [departmentId]);
    return rows;
  },

  /**
   * Get users by role
   */
  getByRole: async (role) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE role = ? ORDER BY full_name', [role]);
    return rows;
  },

  /**
   * Get active users
   */
  getActive: async () => {
    const [rows] = await pool.query('SELECT * FROM users WHERE status = ? ORDER BY full_name', ['active']);
    return rows;
  }
};

module.exports = UserModel;
