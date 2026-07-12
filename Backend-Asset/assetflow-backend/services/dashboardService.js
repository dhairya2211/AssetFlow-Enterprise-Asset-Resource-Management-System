const { pool } = require('../config/database');

/**
 * Get dashboard overview statistics
 */
const getOverviewStats = async () => {
  try {
    const [totalAssets] = await pool.query('SELECT COUNT(*) as count FROM assets');
    const [availableAssets] = await pool.query('SELECT COUNT(*) as count FROM assets WHERE status = "available"');
    const [allocatedAssets] = await pool.query('SELECT COUNT(*) as count FROM assets WHERE status = "allocated"');
    const [maintenanceAssets] = await pool.query('SELECT COUNT(*) as count FROM assets WHERE status = "maintenance"');
    const [pendingTransfers] = await pool.query('SELECT COUNT(*) as count FROM transfer_requests WHERE status = "pending"');
    const [todayBookings] = await pool.query('SELECT COUNT(*) as count FROM resource_bookings WHERE DATE(start_time) = CURDATE()');
    const [pendingMaintenance] = await pool.query('SELECT COUNT(*) as count FROM maintenance_requests WHERE status IN ("pending", "in_progress")');
    const [activeAudits] = await pool.query('SELECT COUNT(*) as count FROM audits WHERE status IN ("scheduled", "in_progress")');
    const [overdueAssets] = await pool.query(`
      SELECT COUNT(DISTINCT aa.asset_id) as count 
      FROM asset_allocations aa 
      WHERE aa.status = 'active' AND aa.expected_return < CURDATE()
    `);

    return {
      totalAssets: totalAssets[0].count,
      availableAssets: availableAssets[0].count,
      allocatedAssets: allocatedAssets[0].count,
      maintenanceAssets: maintenanceAssets[0].count,
      pendingTransfers: pendingTransfers[0].count,
      todayBookings: todayBookings[0].count,
      pendingMaintenance: pendingMaintenance[0].count,
      activeAudits: activeAudits[0].count,
      overdueAssets: overdueAssets[0].count
    };
  } catch (error) {
    console.error('Error getting overview stats:', error);
    throw error;
  }
};

/**
 * Get department-wise asset count
 */
const getDepartmentWiseAssets = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT d.id, d.name, COUNT(a.id) as asset_count
      FROM departments d
      LEFT JOIN assets a ON d.id = a.department_id
      GROUP BY d.id, d.name
      ORDER BY asset_count DESC
    `);
    return rows;
  } catch (error) {
    console.error('Error getting department-wise assets:', error);
    throw error;
  }
};

/**
 * Get recent activity (last 10 items from allocations, transfers, maintenance, audits, bookings)
 */
const getRecentActivity = async () => {
  try {
    // Get recent allocations
    const [recentAllocations] = await pool.query(`
      SELECT 
        aa.id,
        'allocation' as type,
        CONCAT('Asset ', a.asset_name, ' allocated to ', u.full_name) as description,
        aa.created_at,
        u.full_name as user_name
      FROM asset_allocations aa
      JOIN assets a ON aa.asset_id = a.id
      JOIN users u ON aa.user_id = u.id
      ORDER BY aa.created_at DESC
      LIMIT 10
    `);

    // Get recent transfers
    const [recentTransfers] = await pool.query(`
      SELECT 
        tr.id,
        'transfer' as type,
        CONCAT('Transfer request for ', a.asset_name) as description,
        tr.created_at,
        u.full_name as user_name
      FROM transfer_requests tr
      JOIN assets a ON tr.asset_id = a.id
      JOIN users u ON tr.requested_by = u.id
      ORDER BY tr.created_at DESC
      LIMIT 10
    `);

    // Get recent maintenance
    const [recentMaintenance] = await pool.query(`
      SELECT 
        mr.id,
        'maintenance' as type,
        CONCAT('Maintenance request for ', a.asset_name, ': ', mr.issue) as description,
        mr.created_at,
        u.full_name as user_name
      FROM maintenance_requests mr
      JOIN assets a ON mr.asset_id = a.id
      JOIN users u ON mr.requested_by = u.id
      ORDER BY mr.created_at DESC
      LIMIT 10
    `);

    // Combine all and sort by date
    const allActivity = [...recentAllocations, ...recentTransfers, ...recentMaintenance];
    allActivity.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return allActivity.slice(0, 20);
  } catch (error) {
    console.error('Error getting recent activity:', error);
    throw error;
  }
};

module.exports = {
  getOverviewStats,
  getDepartmentWiseAssets,
  getRecentActivity
};
