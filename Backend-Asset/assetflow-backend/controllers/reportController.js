const { successResponse, errorResponse } = require('../utils/responseHandler');
const {
  getUtilizationReport,
  getMaintenanceReport,
  getIdleAssetsReport,
  getBookingsReport,
  getTransfersReport,
  getAuditsReport
} = require('../services/reportService');

/**
 * Get utilization report
 */
const getUtilization = async (req, res) => {
  try {
    const filters = {
      department: req.query.department,
      category: req.query.category,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo
    };
    const report = await getUtilizationReport(filters);
    return successResponse(res, 'Utilization report retrieved successfully', { report });
  } catch (error) {
    console.error('Get utilization report error:', error);
    return errorResponse(res, 'Failed to retrieve utilization report', null, 500);
  }
};

/**
 * Get maintenance report
 */
const getMaintenance = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo
    };
    const report = await getMaintenanceReport(filters);
    return successResponse(res, 'Maintenance report retrieved successfully', { report });
  } catch (error) {
    console.error('Get maintenance report error:', error);
    return errorResponse(res, 'Failed to retrieve maintenance report', null, 500);
  }
};

/**
 * Get idle assets report
 */
const getIdleAssets = async (req, res) => {
  try {
    const filters = {
      department: req.query.department,
      category: req.query.category
    };
    const assets = await getIdleAssetsReport(filters);
    return successResponse(res, 'Idle assets report retrieved successfully', { assets });
  } catch (error) {
    console.error('Get idle assets report error:', error);
    return errorResponse(res, 'Failed to retrieve idle assets report', null, 500);
  }
};

/**
 * Get bookings report
 */
const getBookings = async (req, res) => {
  try {
    const filters = {
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo
    };
    const report = await getBookingsReport(filters);
    return successResponse(res, 'Bookings report retrieved successfully', { report });
  } catch (error) {
    console.error('Get bookings report error:', error);
    return errorResponse(res, 'Failed to retrieve bookings report', null, 500);
  }
};

/**
 * Get transfers report
 */
const getTransfers = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo
    };
    const report = await getTransfersReport(filters);
    return successResponse(res, 'Transfers report retrieved successfully', { report });
  } catch (error) {
    console.error('Get transfers report error:', error);
    return errorResponse(res, 'Failed to retrieve transfers report', null, 500);
  }
};

/**
 * Get audits report
 */
const getAudits = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      department: req.query.department
    };
    const report = await getAuditsReport(filters);
    return successResponse(res, 'Audits report retrieved successfully', { report });
  } catch (error) {
    console.error('Get audits report error:', error);
    return errorResponse(res, 'Failed to retrieve audits report', null, 500);
  }
};

/**
 * Export report (placeholder)
 */
const exportReport = async (req, res) => {
  try {
    // This is a placeholder - in a real implementation, you'd generate a CSV/Excel file
    return successResponse(res, 'Report export initiated successfully');
  } catch (error) {
    console.error('Export report error:', error);
    return errorResponse(res, 'Failed to export report', null, 500);
  }
};

module.exports = {
  getUtilization,
  getMaintenance,
  getIdleAssets,
  getBookings,
  getTransfers,
  getAudits,
  exportReport
};
