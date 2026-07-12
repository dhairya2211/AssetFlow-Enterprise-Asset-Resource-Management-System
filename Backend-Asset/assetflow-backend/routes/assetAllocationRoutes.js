const express = require('express');
const router = express.Router();
const assetAllocationController = require('../controllers/assetAllocationController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createAllocationValidation,
  updateAllocationValidation,
  returnAllocationValidation,
  allocationIdValidation,
  allocationQueryValidation
} = require('../validators/assetAllocationValidator');

/**
 * @route   GET /api/v1/allocations
 * @desc    Get all allocations with search, pagination, sorting, filtering
 * @access  Private (Authenticated)
 */
router.get('/', authenticate, allocationQueryValidation, assetAllocationController.getAllAllocations);

/**
 * @route   GET /api/v1/allocations/dashboard
 * @desc    Get dashboard counts
 * @access  Private (Authenticated)
 */
router.get('/dashboard', authenticate, assetAllocationController.getDashboardCounts);

/**
 * @route   GET /api/v1/allocations/active
 * @desc    Get active allocations
 * @access  Private (Authenticated)
 */
router.get('/active', authenticate, assetAllocationController.getActiveAllocations);

/**
 * @route   GET /api/v1/allocations/overdue
 * @desc    Get overdue allocations
 * @access  Private (Authenticated)
 */
router.get('/overdue', authenticate, assetAllocationController.getOverdueAllocations);

/**
 * @route   GET /api/v1/allocations/:id
 * @desc    Get allocation by ID
 * @access  Private (Authenticated)
 */
router.get('/:id', authenticate, allocationIdValidation, assetAllocationController.getAllocationById);

/**
 * @route   POST /api/v1/allocations
 * @desc    Create new allocation
 * @access  Private (Admin, Asset Manager)
 */
router.post('/', authenticate, authorizeRoles('admin', 'manager'), createAllocationValidation, assetAllocationController.createAllocation);

/**
 * @route   PUT /api/v1/allocations/:id
 * @desc    Update allocation
 * @access  Private (Admin, Asset Manager)
 */
router.put('/:id', authenticate, authorizeRoles('admin', 'manager'), updateAllocationValidation, assetAllocationController.updateAllocation);

/**
 * @route   PATCH /api/v1/allocations/:id/return
 * @desc    Return asset
 * @access  Private (Admin, Asset Manager)
 */
router.patch('/:id/return', authenticate, authorizeRoles('admin', 'manager'), returnAllocationValidation, assetAllocationController.returnAllocation);

/**
 * @route   DELETE /api/v1/allocations/:id
 * @desc    Delete allocation
 * @access  Private (Admin)
 */
router.delete('/:id', authenticate, authorizeRoles('admin'), allocationIdValidation, assetAllocationController.deleteAllocation);

module.exports = router;
