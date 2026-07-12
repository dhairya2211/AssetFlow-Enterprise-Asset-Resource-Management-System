const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/roleMiddleware');

/**
 * @route   GET /api/v1/dashboard/overview
 * @desc    Get dashboard overview
 * @access  Private (Authenticated)
 */
router.get('/overview', authenticate, dashboardController.getOverview);

/**
 * @route   GET /api/v1/dashboard/statistics
 * @desc    Get dashboard statistics
 * @access  Private (Authenticated)
 */
router.get('/statistics', authenticate, dashboardController.getStatistics);

/**
 * @route   GET /api/v1/dashboard/recent-activity
 * @desc    Get recent activity
 * @access  Private (Authenticated)
 */
router.get('/recent-activity', authenticate, dashboardController.getRecentActivity);

module.exports = router;
