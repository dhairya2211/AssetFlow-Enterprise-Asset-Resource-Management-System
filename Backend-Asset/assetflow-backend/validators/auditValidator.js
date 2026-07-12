const { body, param, query, validationResult } = require('express-validator');

/**
 * Validation middleware
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  }
  next();
};

/**
 * Create audit validation
 */
const createAuditValidation = [
  body('audit_name')
    .notEmpty()
    .withMessage('Audit name is required')
    .trim()
    .isLength({ max: 255 })
    .withMessage('Audit name must not exceed 255 characters'),
  
  body('department_id')
    .optional()
    .isInt()
    .withMessage('Department ID must be an integer'),
  
  body('auditor')
    .notEmpty()
    .withMessage('Auditor is required')
    .isInt()
    .withMessage('Auditor must be an integer'),
  
  body('start_date')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  
  body('end_date')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (value && new Date(value) < new Date(req.body.start_date)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  body('status')
    .optional()
    .isIn(['scheduled', 'in_progress', 'closed'])
    .withMessage('Status must be scheduled, in_progress, or closed'),
  
  validate
];

/**
 * Update audit validation
 */
const updateAuditValidation = [
  param('id')
    .isInt()
    .withMessage('Audit ID must be an integer'),
  
  body('audit_name')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Audit name must not exceed 255 characters'),
  
  body('department_id')
    .optional()
    .isInt()
    .withMessage('Department ID must be an integer'),
  
  body('auditor')
    .optional()
    .isInt()
    .withMessage('Auditor must be an integer'),
  
  body('start_date')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  
  body('end_date')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (value && req.body.start_date && new Date(value) < new Date(req.body.start_date)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  validate
];

/**
 * Create audit items validation
 */
const createAuditItemsValidation = [
  param('id')
    .isInt()
    .withMessage('Audit ID must be an integer'),
  
  body('items')
    .isArray({ min: 1 })
    .withMessage('Items must be an array with at least one item'),
  
  body('items.*.asset_id')
    .notEmpty()
    .withMessage('Asset ID is required for each item')
    .isInt()
    .withMessage('Asset ID must be an integer'),
  
  body('items.*.verification_status')
    .optional()
    .isIn(['verified', 'missing', 'damaged', 'mismatch'])
    .withMessage('Verification status must be verified, missing, damaged, or mismatch'),
  
  body('items.*.remarks')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Remarks must not exceed 2000 characters'),
  
  validate
];

/**
 * Update audit item validation
 */
const updateAuditItemValidation = [
  param('itemId')
    .isInt()
    .withMessage('Audit item ID must be an integer'),
  
  body('verification_status')
    .optional()
    .isIn(['verified', 'missing', 'damaged', 'mismatch'])
    .withMessage('Verification status must be verified, missing, damaged, or mismatch'),
  
  body('remarks')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Remarks must not exceed 2000 characters'),
  
  validate
];

/**
 * Verify audit item validation
 */
const verifyAuditItemValidation = [
  param('itemId')
    .isInt()
    .withMessage('Audit item ID must be an integer'),
  
  body('verification_status')
    .notEmpty()
    .withMessage('Verification status is required')
    .isIn(['verified', 'missing', 'damaged', 'mismatch'])
    .withMessage('Verification status must be verified, missing, damaged, or mismatch'),
  
  body('remarks')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Remarks must not exceed 2000 characters'),
  
  validate
];

/**
 * Audit ID validation
 */
const auditIdValidation = [
  param('id')
    .isInt()
    .withMessage('Audit ID must be an integer'),
  
  validate
];

/**
 * Query validation for search, pagination, sorting, filtering
 */
const auditQueryValidation = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Search term must not be empty'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sortBy')
    .optional()
    .isIn(['created_at', 'start_date', 'audit_date'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  query('status')
    .optional()
    .isIn(['scheduled', 'in_progress', 'closed'])
    .withMessage('Invalid status filter'),
  
  query('department')
    .optional()
    .isInt()
    .withMessage('Department filter must be an integer'),
  
  validate
];

module.exports = {
  createAuditValidation,
  updateAuditValidation,
  createAuditItemsValidation,
  updateAuditItemValidation,
  verifyAuditItemValidation,
  auditIdValidation,
  auditQueryValidation
};
