const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createMaintenanceValidation,
  updateMaintenanceValidation,
  assignMaintenanceValidation,
  maintenanceIdValidation,
  maintenanceQueryValidation
} = require('../validators/maintenanceValidator');

/**
 * @route   GET /api/v1/maintenance
 * @desc    Get all maintenance requests with search, pagination, sorting, filtering
 * @access  Private (Authenticated)
 */
router.get('/', authenticate, maintenanceQueryValidation, maintenanceController.getAllMaintenance);

/**
 * @route   GET /api/v1/maintenance/pending
 * @desc    Get pending maintenance requests
 * @access  Private (Authenticated)
 */
router.get('/pending', authenticate, maintenanceController.getPendingMaintenance);

/**
 * @route   GET /api/v1/maintenance/in-progress
 * @desc    Get in-progress maintenance requests
 * @access  Private (Authenticated)
 */
router.get('/in-progress', authenticate, maintenanceController.getInProgressMaintenance);

/**
 * @route   GET /api/v1/maintenance/resolved
 * @desc    Get resolved maintenance requests
 * @access  Private (Authenticated)
 */
router.get('/resolved', authenticate, maintenanceController.getResolvedMaintenance);

/**
 * @route   GET /api/v1/maintenance/:id
 * @desc    Get maintenance request by ID
 * @access  Private (Authenticated)
 */
router.get('/:id', authenticate, maintenanceIdValidation, maintenanceController.getMaintenanceById);

/**
 * @route   POST /api/v1/maintenance
 * @desc    Create new maintenance request
 * @access  Private (Manager, Admin)
 */
router.post('/', authenticate, authorizeRoles('admin', 'manager'), createMaintenanceValidation, maintenanceController.createMaintenance);

/**
 * @route   PUT /api/v1/maintenance/:id
 * @desc    Update maintenance request
 * @access  Private (Manager, Admin)
 */
router.put('/:id', authenticate, authorizeRoles('admin', 'manager'), updateMaintenanceValidation, maintenanceController.updateMaintenance);

/**
 * @route   PATCH /api/v1/maintenance/:id/assign
 * @desc    Assign maintenance request
 * @access  Private (Manager, Admin)
 */
router.patch('/:id/assign', authenticate, authorizeRoles('admin', 'manager'), assignMaintenanceValidation, maintenanceController.assignMaintenance);

/**
 * @route   PATCH /api/v1/maintenance/:id/resolve
 * @desc    Resolve maintenance request
 * @access  Private (Manager, Admin)
 */
router.patch('/:id/resolve', authenticate, authorizeRoles('admin', 'manager'), maintenanceIdValidation, maintenanceController.resolveMaintenance);

/**
 * @route   DELETE /api/v1/maintenance/:id
 * @desc    Delete maintenance request
 * @access  Private (Admin)
 */
router.delete('/:id', authenticate, authorizeRoles('admin'), maintenanceIdValidation, maintenanceController.deleteMaintenance);

module.exports = router;
