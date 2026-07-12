const { successResponse, errorResponse } = require('../utils/responseHandler');
const { getOverviewStats, getDepartmentWiseAssets, getRecentActivity } = require('../services/dashboardService');

/**
 * Get dashboard overview
 */
const getOverview = async (req, res) => {
  try {
    const stats = await getOverviewStats();
    const departmentAssets = await getDepartmentWiseAssets();
    const recentActivity = await getRecentActivity();

    return successResponse(res, 'Dashboard overview retrieved successfully', {
      ...stats,
      departmentWiseAssets: departmentAssets,
      recentActivity
    });
  } catch (error) {
    console.error('Get overview error:', error);
    return errorResponse(res, 'Failed to retrieve dashboard overview', null, 500);
  }
};

/**
 * Get dashboard statistics
 */
const getStatistics = async (req, res) => {
  try {
    const stats = await getOverviewStats();
    const departmentAssets = await getDepartmentWiseAssets();

    return successResponse(res, 'Dashboard statistics retrieved successfully', {
      statistics: stats,
      departmentWiseAssets
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    return errorResponse(res, 'Failed to retrieve dashboard statistics', null, 500);
  }
};

/**
 * Get recent activity
 */
const getRecentActivityEndpoint = async (req, res) => {
  try {
    const activity = await getRecentActivity();
    return successResponse(res, 'Recent activity retrieved successfully', { activity });
  } catch (error) {
    console.error('Get recent activity error:', error);
    return errorResponse(res, 'Failed to retrieve recent activity', null, 500);
  }
};

module.exports = {
  getOverview,
  getStatistics,
  getRecentActivity: getRecentActivityEndpoint
};
