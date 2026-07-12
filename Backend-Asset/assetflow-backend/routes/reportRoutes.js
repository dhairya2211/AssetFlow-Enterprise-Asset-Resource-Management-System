const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');

/**
 * @route   GET /api/v1/reports/utilization
 * @desc    Get utilization report
 * @access  Private (Manager, Admin)
 */
router.get('/utilization', authenticate, authorizeRoles('admin', 'manager'), reportController.getUtilization);

/**
 * @route   GET /api/v1/reports/maintenance
 * @desc    Get maintenance report
 * @access  Private (Manager, Admin)
 */
router.get('/maintenance', authenticate, authorizeRoles('admin', 'manager'), reportController.getMaintenance);

/**
 * @route   GET /api/v1/reports/idle-assets
 * @desc    Get idle assets report
 * @access  Private (Manager, Admin)
 */
router.get('/idle-assets', authenticate, authorizeRoles('admin', 'manager'), reportController.getIdleAssets);

/**
 * @route   GET /api/v1/reports/bookings
 * @desc    Get bookings report
 * @access  Private (Manager, Admin)
 */
router.get('/bookings', authenticate, authorizeRoles('admin', 'manager'), reportController.getBookings);

/**
 * @route   GET /api/v1/reports/transfers
 * @desc    Get transfers report
 * @access  Private (Manager, Admin)
 */
router.get('/transfers', authenticate, authorizeRoles('admin', 'manager'), reportController.getTransfers);

/**
 * @route   GET /api/v1/reports/audits
 * @desc    Get audits report
 * @access  Private (Manager, Admin)
 */
router.get('/audits', authenticate, authorizeRoles('admin', 'manager'), reportController.getAudits);

/**
 * @route   GET /api/v1/reports/export
 * @desc    Export report
 * @access  Private (Manager, Admin)
 */
router.get('/export', authenticate, authorizeRoles('admin', 'manager'), reportController.exportReport);

module.exports = router;
