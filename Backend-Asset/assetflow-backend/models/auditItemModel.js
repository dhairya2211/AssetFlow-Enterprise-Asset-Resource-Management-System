const { pool } = require('../config/database');

const AuditItemModel = {
  /**
   * Get all audit items
   */
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT ai.*, 
             a.audit_name,
             ast.asset_name, ast.asset_tag, ast.serial_number
      FROM audit_items ai
      JOIN audits a ON ai.audit_id = a.id
      JOIN assets ast ON ai.asset_id = ast.id
      ORDER BY ai.audit_id, ai.id
    `);
    return rows;
  },

  /**
   * Get audit item by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT ai.*, 
             a.audit_name,
             ast.asset_name, ast.asset_tag, ast.serial_number
      FROM audit_items ai
      JOIN audits a ON ai.audit_id = a.id
      JOIN assets ast ON ai.asset_id = ast.id
      WHERE ai.id = ?
    `, [id]);
    return rows[0];
  },

  /**
   * Get audit items by audit ID
   */
  getByAuditId: async (auditId) => {
    const [rows] = await pool.query(`
      SELECT ai.*, 
             a.audit_name,
             ast.asset_name, ast.asset_tag, ast.serial_number
      FROM audit_items ai
      JOIN audits a ON ai.audit_id = a.id
      JOIN assets ast ON ai.asset_id = ast.id
      WHERE ai.audit_id = ?
      ORDER BY ai.id
    `, [auditId]);
    return rows;
  },

  /**
   * Get audit items by asset
   */
  getByAsset: async (assetId) => {
    const [rows] = await pool.query(`
      SELECT ai.*, 
             a.audit_name,
             ast.asset_name, ast.asset_tag, ast.serial_number
      FROM audit_items ai
      JOIN audits a ON ai.audit_id = a.id
      JOIN assets ast ON ai.asset_id = ast.id
      WHERE ai.asset_id = ?
      ORDER BY ai.audit_id DESC
    `, [assetId]);
    return rows;
  },

  /**
   * Get audit items by verification status
   */
  getByVerificationStatus: async (auditId, status) => {
    const [rows] = await pool.query(`
      SELECT ai.*, 
             a.audit_name,
             ast.asset_name, ast.asset_tag, ast.serial_number
      FROM audit_items ai
      JOIN audits a ON ai.audit_id = a.id
      JOIN assets ast ON ai.asset_id = ast.id
      WHERE ai.audit_id = ? AND ai.verification_status = ?
      ORDER BY ai.id
    `, [auditId, status]);
    return rows;
  },

  /**
   * Create new audit item
   */
  create: async (auditItem, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query(
      'INSERT INTO audit_items (audit_id, asset_id, verification_status, remarks) VALUES (?, ?, ?, ?)',
      [
        auditItem.audit_id,
        auditItem.asset_id,
        auditItem.verification_status || 'verified',
        auditItem.remarks || null
      ]
    );
    return result.insertId;
  },

  /**
   * Create multiple audit items
   */
  createBulk: async (auditItems, connection = null) => {
    const db = connection || pool;
    const values = auditItems.map(item => [
      item.audit_id,
      item.asset_id,
      item.verification_status || 'verified',
      item.remarks || null
    ]);
    const [result] = await db.query(
      'INSERT INTO audit_items (audit_id, asset_id, verification_status, remarks) VALUES ?',
      [values]
    );
    return result.affectedRows;
  },

  /**
   * Update audit item
   */
  update: async (id, auditItem, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query(
      'UPDATE audit_items SET verification_status = ?, remarks = ? WHERE id = ?',
      [auditItem.verification_status, auditItem.remarks, id]
    );
    return result.affectedRows;
  },

  /**
   * Update verification status
   */
  updateVerificationStatus: async (id, status, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query('UPDATE audit_items SET verification_status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  },

  /**
   * Delete audit item
   */
  delete: async (id, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query('DELETE FROM audit_items WHERE id = ?', [id]);
    return result.affectedRows;
  },

  /**
   * Delete all items for an audit
   */
  deleteByAuditId: async (auditId, connection = null) => {
    const db = connection || pool;
    const [result] = await db.query('DELETE FROM audit_items WHERE audit_id = ?', [auditId]);
    return result.affectedRows;
  }
};

module.exports = AuditItemModel;
