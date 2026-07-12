const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createTransferValidation,
  transferIdValidation,
  transferQueryValidation
} = require('../validators/transferValidator');

/**
 * @route   GET /api/v1/transfers
 * @desc    Get all transfer requests with search, pagination, sorting, filtering
 * @access  Private (Authenticated)
 */
router.get('/', authenticate, transferQueryValidation, transferController.getAllTransfers);

/**
 * @route   GET /api/v1/transfers/pending
 * @desc    Get pending transfer requests
 * @access  Private (Authenticated)
 */
router.get('/pending', authenticate, transferController.getPendingTransfers);

/**
 * @route   GET /api/v1/transfers/:id
 * @desc    Get transfer request by ID
 * @access  Private (Authenticated)
 */
router.get('/:id', authenticate, transferIdValidation, transferController.getTransferById);

/**
 * @route   POST /api/v1/transfers
 * @desc    Create new transfer request
 * @access  Private (Admin, Asset Manager)
 */
router.post('/', authenticate, authorizeRoles('admin', 'manager'), createTransferValidation, transferController.createTransfer);

/**
 * @route   PATCH /api/v1/transfers/:id/approve
 * @desc    Approve transfer request
 * @access  Private (Admin, Asset Manager)
 */
router.patch('/:id/approve', authenticate, authorizeRoles('admin', 'manager'), transferIdValidation, transferController.approveTransferRequest);

/**
 * @route   PATCH /api/v1/transfers/:id/reject
 * @desc    Reject transfer request
 * @access  Private (Admin, Asset Manager)
 */
router.patch('/:id/reject', authenticate, authorizeRoles('admin', 'manager'), transferIdValidation, transferController.rejectTransferRequest);

module.exports = router;
