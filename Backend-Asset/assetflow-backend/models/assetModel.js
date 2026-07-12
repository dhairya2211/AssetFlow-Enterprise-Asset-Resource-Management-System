const { pool } = require('../config/database');

const AssetModel = {
  /**
   * Get all assets
   */
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT a.*, 
             c.name as category_name, 
             d.name as department_name
      FROM assets a
      LEFT JOIN asset_categories c ON a.category_id = c.id
      LEFT JOIN departments d ON a.department_id = d.id
      ORDER BY a.asset_name
    `);
    return rows;
  },

  /**
   * Get asset by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT a.*, 
             c.name as category_name, 
             d.name as department_name
      FROM assets a
      LEFT JOIN asset_categories c ON a.category_id = c.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.id = ?
    `, [id]);
    return rows[0];
  },

  /**
   * Get asset by tag
   */
  getByTag: async (assetTag) => {
    const [rows] = await pool.query(`
      SELECT a.*, 
             c.name as category_name, 
             d.name as department_name
      FROM assets a
      LEFT JOIN asset_categories c ON a.category_id = c.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.asset_tag = ?
    `, [assetTag]);
    return rows[0];
  },

  /**
   * Get assets by category
   */
  getByCategory: async (categoryId) => {
    const [rows] = await pool.query(`
      SELECT a.*, 
             c.name as category_name, 
             d.name as department_name
      FROM assets a
      LEFT JOIN asset_categories c ON a.category_id = c.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.category_id = ?
      ORDER BY a.asset_name
    `, [categoryId]);
    return rows;
  },

  /**
   * Get assets by department
   */
  getByDepartment: async (departmentId) => {
    const [rows] = await pool.query(`
      SELECT a.*, 
             c.name as category_name, 
             d.name as department_name
      FROM assets a
      LEFT JOIN asset_categories c ON a.category_id = c.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.department_id = ?
      ORDER BY a.asset_name
    `, [departmentId]);
    return rows;
  },

  /**
   * Get assets by status
   */
  getByStatus: async (status) => {
    const [rows] = await pool.query(`
      SELECT a.*, 
             c.name as category_name, 
             d.name as department_name
      FROM assets a
      LEFT JOIN asset_categories c ON a.category_id = c.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.status = ?
      ORDER BY a.asset_name
    `, [status]);
    return rows;
  },

  /**
   * Get available assets
   */
  getAvailable: async () => {
    const [rows] = await pool.query(`
      SELECT a.*, 
             c.name as category_name, 
             d.name as department_name
      FROM assets a
      LEFT JOIN asset_categories c ON a.category_id = c.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.status = 'available'
      ORDER BY a.asset_name
    `);
    return rows;
  },

  /**
   * Create new asset
   */
  create: async (asset) => {
    const [result] = await pool.query(
      `INSERT INTO assets (asset_tag, asset_name, serial_number, category_id, department_id, purchase_date, purchase_cost, current_condition, status, location, is_shared, image, remarks) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        asset.asset_tag,
        asset.asset_name,
        asset.serial_number || null,
        asset.category_id,
        asset.department_id || null,
        asset.purchase_date || null,
        asset.purchase_cost || null,
        asset.current_condition || 'good',
        asset.status || 'available',
        asset.location || null,
        asset.is_shared || false,
        asset.image || null,
        asset.remarks || null
      ]
    );
    return result.insertId;
  },

  /**
   * Update asset
   */
  update: async (id, asset) => {
    const [result] = await pool.query(
      `UPDATE assets SET asset_tag = ?, asset_name = ?, serial_number = ?, category_id = ?, department_id = ?, 
       purchase_date = ?, purchase_cost = ?, current_condition = ?, status = ?, location = ?, is_shared = ?, image = ?, remarks = ? 
       WHERE id = ?`,
      [
        asset.asset_tag,
        asset.asset_name,
        asset.serial_number,
        asset.category_id,
        asset.department_id,
        asset.purchase_date,
        asset.purchase_cost,
        asset.current_condition,
        asset.status,
        asset.location,
        asset.is_shared,
        asset.image,
        asset.remarks,
        id
      ]
    );
    return result.affectedRows;
  },

  /**
   * Update asset status
   */
  updateStatus: async (id, status, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query('UPDATE assets SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  },

  /**
   * Delete asset
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM assets WHERE id = ?', [id]);
    return result.affectedRows;
  },

  /**
   * Search assets by name or tag
   */
  search: async (searchTerm) => {
    const [rows] = await pool.query(`
      SELECT a.*, 
             c.name as category_name, 
             d.name as department_name
      FROM assets a
      LEFT JOIN asset_categories c ON a.category_id = c.id
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.asset_name LIKE ? OR a.asset_tag LIKE ? OR a.serial_number LIKE ?
      ORDER BY a.asset_name
    `, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
    return rows;
  }
};

module.exports = AssetModel;
