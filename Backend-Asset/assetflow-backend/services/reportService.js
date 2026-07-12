const { pool } = require('../config/database');

/**
 * Get utilization report
 */
const getUtilizationReport = async (filters = {}) => {
  try {
    const { department, category, dateFrom, dateTo } = filters;

    let whereClause = ' WHERE 1=1';
    const params = [];

    if (department) {
      whereClause += ' AND a.department_id = ?';
      params.push(department);
    }

    if (category) {
      whereClause += ' AND a.category_id = ?';
      params.push(category);
    }

    // Get total assets
    const [totalAssets] = await pool.query(`
      SELECT COUNT(*) as total FROM assets a${whereClause}
    `, params);

    // Get allocated assets
    const [allocatedAssets] = await pool.query(`
      SELECT COUNT(*) as allocated FROM assets a${whereClause} AND a.status = 'allocated'
    `, params);

    // Get department-wise utilization
    const [departmentUtilization] = await pool.query(`
      SELECT 
        d.id,
        d.name,
        COUNT(a.id) as total_assets,
        SUM(CASE WHEN a.status = 'allocated' THEN 1 ELSE 0 END) as allocated_assets,
        ROUND((SUM(CASE WHEN a.status = 'allocated' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) as utilization_percent
      FROM departments d
      LEFT JOIN assets a ON d.id = a.department_id
      ${department ? 'WHERE d.id = ?' : ''}
      GROUP BY d.id, d.name
      ORDER BY utilization_percent DESC
    `, department ? [department] : []);

    return {
      totalAssets: totalAssets[0].total,
      allocatedAssets: allocatedAssets[0].allocated,
      utilizationPercent: totalAssets[0].total > 0 
        ? Math.round((allocatedAssets[0].allocated / totalAssets[0].total) * 100) 
        : 0,
      departmentUtilization
    };
  } catch (error) {
    console.error('Error getting utilization report:', error);
    throw error;
  }
};

/**
 * Get maintenance report
 */
const getMaintenanceReport = async (filters = {}) => {
  try {
    const { status, priority, dateFrom, dateTo } = filters;

    let whereClause = ' WHERE 1=1';
    const params = [];

    if (status) {
      whereClause += ' AND mr.status = ?';
      params.push(status);
    }

    if (priority) {
      whereClause += ' AND mr.priority = ?';
      params.push(priority);
    }

    const [maintenanceStats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN mr.status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN mr.status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN mr.status = 'resolved' THEN 1 ELSE 0 END) as resolved,
        SUM(CASE WHEN mr.priority = 'low' THEN 1 ELSE 0 END) as low_priority,
        SUM(CASE WHEN mr.priority = 'medium' THEN 1 ELSE 0 END) as medium_priority,
        SUM(CASE WHEN mr.priority = 'high' THEN 1 ELSE 0 END) as high_priority,
        SUM(CASE WHEN mr.priority = 'critical' THEN 1 ELSE 0 END) as critical_priority
      FROM maintenance_requests mr
      ${whereClause}
    `, params);

    return maintenanceStats[0];
  } catch (error) {
    console.error('Error getting maintenance report:', error);
    throw error;
  }
};

/**
 * Get idle assets report
 */
const getIdleAssetsReport = async (filters = {}) => {
  try {
    const { department, category } = filters;

    let whereClause = ' WHERE a.status = "available"';
    const params = [];

    if (department) {
      whereClause += ' AND a.department_id = ?';
      params.push(department);
    }

    if (category) {
      whereClause += ' AND a.category_id = ?';
      params.push(category);
    }

    const [idleAssets] = await pool.query(`
      SELECT 
        a.*,
        c.name as category_name,
        d.name as department_name
      FROM assets a
      LEFT JOIN asset_categories c ON a.category_id = c.id
      LEFT JOIN departments d ON a.department_id = d.id
      ${whereClause}
      ORDER BY a.created_at ASC
    `, params);

    return idleAssets;
  } catch (error) {
    console.error('Error getting idle assets report:', error);
    throw error;
  }
};

/**
 * Get bookings report
 */
const getBookingsReport = async (filters = {}) => {
  try {
    const { dateFrom, dateTo } = filters;

    let whereClause = ' WHERE 1=1';
    const params = [];

    if (dateFrom) {
      whereClause += ' AND rb.start_time >= ?';
      params.push(dateFrom);
    }

    if (dateTo) {
      whereClause += ' AND rb.end_time <= ?';
      params.push(dateTo);
    }

    const [bookingStats] = await pool.query(`
      SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN rb.status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN rb.status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN rb.status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
      FROM resource_bookings rb
      ${whereClause}
    `, params);

    return bookingStats[0];
  } catch (error) {
    console.error('Error getting bookings report:', error);
    throw error;
  }
};

/**
 * Get transfers report
 */
const getTransfersReport = async (filters = {}) => {
  try {
    const { status, dateFrom, dateTo } = filters;

    let whereClause = ' WHERE 1=1';
    const params = [];

    if (status) {
      whereClause += ' AND tr.status = ?';
      params.push(status);
    }

    if (dateFrom) {
      whereClause += ' AND tr.created_at >= ?';
      params.push(dateFrom);
    }

    if (dateTo) {
      whereClause += ' AND tr.created_at <= ?';
      params.push(dateTo);
    }

    const [transferStats] = await pool.query(`
      SELECT 
        COUNT(*) as total_transfers,
        SUM(CASE WHEN tr.status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN tr.status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN tr.status = 'rejected' THEN 1 ELSE 0 END) as rejected
      FROM transfer_requests tr
      ${whereClause}
    `, params);

    return transferStats[0];
  } catch (error) {
    console.error('Error getting transfers report:', error);
    throw error;
  }
};

/**
 * Get audits report
 */
const getAuditsReport = async (filters = {}) => {
  try {
    const { status, department } = filters;

    let whereClause = ' WHERE 1=1';
    const params = [];

    if (status) {
      whereClause += ' AND a.status = ?';
      params.push(status);
    }

    if (department) {
      whereClause += ' AND a.department_id = ?';
      params.push(department);
    }

    const [auditStats] = await pool.query(`
      SELECT 
        COUNT(*) as total_audits,
        SUM(CASE WHEN a.status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
        SUM(CASE WHEN a.status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN a.status = 'closed' THEN 1 ELSE 0 END) as closed
      FROM audits a
      ${whereClause}
    `, params);

    return auditStats[0];
  } catch (error) {
    console.error('Error getting audits report:', error);
    throw error;
  }
};

module.exports = {
  getUtilizationReport,
  getMaintenanceReport,
  getIdleAssetsReport,
  getBookingsReport,
  getTransfersReport,
  getAuditsReport
};
