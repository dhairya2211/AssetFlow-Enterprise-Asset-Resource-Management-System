const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createAuditValidation,
  updateAuditValidation,
  createAuditItemsValidation,
  updateAuditItemValidation,
  verifyAuditItemValidation,
  auditIdValidation,
  auditQueryValidation
} = require('../validators/auditValidator');

/**
 * @route   GET /api/v1/audits
 * @desc    Get all audits with search, pagination, sorting, filtering
 * @access  Private (Authenticated)
 */
router.get('/', authenticate, auditQueryValidation, auditController.getAllAudits);

/**
 * @route   GET /api/v1/audits/:id
 * @desc    Get audit by ID with items
 * @access  Private (Authenticated)
 */
router.get('/:id', authenticate, auditIdValidation, auditController.getAuditById);

/**
 * @route   POST /api/v1/audits
 * @desc    Create new audit
 * @access  Private (Manager, Admin)
 */
router.post('/', authenticate, authorizeRoles('admin', 'manager'), createAuditValidation, auditController.createAudit);

/**
 * @route   PUT /api/v1/audits/:id
 * @desc    Update audit
 * @access  Private (Manager, Admin)
 */
router.put('/:id', authenticate, authorizeRoles('admin', 'manager'), updateAuditValidation, auditController.updateAudit);

/**
 * @route   DELETE /api/v1/audits/:id
 * @desc    Delete audit
 * @access  Private (Admin)
 */
router.delete('/:id', authenticate, authorizeRoles('admin'), auditIdValidation, auditController.deleteAudit);

/**
 * @route   PATCH /api/v1/audits/:id/close
 * @desc    Close audit
 * @access  Private (Manager, Admin)
 */
router.patch('/:id/close', authenticate, authorizeRoles('admin', 'manager'), auditIdValidation, auditController.closeAudit);

/**
 * @route   POST /api/v1/audits/:id/items
 * @desc    Add items to audit
 * @access  Private (Manager, Admin)
 */
router.post('/:id/items', authenticate, authorizeRoles('admin', 'manager'), createAuditItemsValidation, auditController.createAuditItems);

/**
 * @route   PUT /api/v1/audits/items/:itemId
 * @desc    Update audit item
 * @access  Private (Manager, Admin)
 */
router.put('/items/:itemId', authenticate, authorizeRoles('admin', 'manager'), updateAuditItemValidation, auditController.updateAuditItem);

/**
 * @route   PATCH /api/v1/audits/items/:itemId/verify
 * @desc    Verify audit item
 * @access  Private (Manager, Admin)
 */
router.patch('/items/:itemId/verify', authenticate, authorizeRoles('admin', 'manager'), verifyAuditItemValidation, auditController.verifyAuditItem);

module.exports = router;
