const { pool } = require('../config/database');

const AssetCategoryModel = {
  /**
   * Get all asset categories
   */
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM asset_categories ORDER BY name');
    return rows;
  },

  /**
   * Get category by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM asset_categories WHERE id = ?', [id]);
    return rows[0];
  },

  /**
   * Get category by name
   */
  getByName: async (name) => {
    const [rows] = await pool.query('SELECT * FROM asset_categories WHERE name = ?', [name]);
    return rows[0];
  },

  /**
   * Create new category
   */
  create: async (category) => {
    const [result] = await pool.query(
      'INSERT INTO asset_categories (name, description) VALUES (?, ?)',
      [category.name, category.description || null]
    );
    return result.insertId;
  },

  /**
   * Update category
   */
  update: async (id, category) => {
    const [result] = await pool.query(
      'UPDATE asset_categories SET name = ?, description = ? WHERE id = ?',
      [category.name, category.description, id]
    );
    return result.affectedRows;
  },

  /**
   * Delete category
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM asset_categories WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = AssetCategoryModel;
