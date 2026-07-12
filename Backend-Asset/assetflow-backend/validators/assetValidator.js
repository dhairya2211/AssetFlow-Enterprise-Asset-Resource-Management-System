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
 * Create asset validation
 */
const createAssetValidation = [
  body('asset_name')
    .trim()
    .notEmpty()
    .withMessage('Asset name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Asset name must be between 2 and 100 characters'),
  
  body('serial_number')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Serial number must not exceed 100 characters'),
  
  body('category_id')
    .notEmpty()
    .withMessage('Category ID is required')
    .isInt()
    .withMessage('Category ID must be an integer'),
  
  body('department_id')
    .optional()
    .isInt()
    .withMessage('Department ID must be an integer'),
  
  body('purchase_date')
    .optional()
    .isISO8601()
    .withMessage('Purchase date must be a valid date')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('Purchase date cannot be in the future');
      }
      return true;
    }),
  
  body('purchase_cost')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Purchase cost must be a non-negative number'),
  
  body('current_condition')
    .optional()
    .isIn(['new', 'good', 'fair', 'poor', 'damaged'])
    .withMessage('Condition must be new, good, fair, poor, or damaged'),
  
  body('status')
    .optional()
    .isIn(['available', 'allocated', 'reserved', 'maintenance', 'lost', 'retired', 'disposed'])
    .withMessage('Invalid status value'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters'),
  
  body('is_shared')
    .optional()
    .isBoolean()
    .withMessage('is_shared must be a boolean'),
  
  body('remarks')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Remarks must not exceed 1000 characters'),
  
  validate
];

/**
 * Update asset validation
 */
const updateAssetValidation = [
  param('id')
    .isInt()
    .withMessage('Asset ID must be an integer'),
  
  body('asset_name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Asset name must be between 2 and 100 characters'),
  
  body('serial_number')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Serial number must not exceed 100 characters'),
  
  body('category_id')
    .optional()
    .isInt()
    .withMessage('Category ID must be an integer'),
  
  body('department_id')
    .optional()
    .isInt()
    .withMessage('Department ID must be an integer'),
  
  body('purchase_date')
    .optional()
    .isISO8601()
    .withMessage('Purchase date must be a valid date')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('Purchase date cannot be in the future');
      }
      return true;
    }),
  
  body('purchase_cost')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Purchase cost must be a non-negative number'),
  
  body('current_condition')
    .optional()
    .isIn(['new', 'good', 'fair', 'poor', 'damaged'])
    .withMessage('Condition must be new, good, fair, poor, or damaged'),
  
  body('status')
    .optional()
    .isIn(['available', 'allocated', 'reserved', 'maintenance', 'lost', 'retired', 'disposed'])
    .withMessage('Invalid status value'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters'),
  
  body('is_shared')
    .optional()
    .isBoolean()
    .withMessage('is_shared must be a boolean'),
  
  body('remarks')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Remarks must not exceed 1000 characters'),
  
  validate
];

/**
 * Update asset status validation
 */
const updateAssetStatusValidation = [
  param('id')
    .isInt()
    .withMessage('Asset ID must be an integer'),
  
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['available', 'allocated', 'reserved', 'maintenance', 'lost', 'retired', 'disposed'])
    .withMessage('Invalid status value'),
  
  validate
];

/**
 * Asset ID validation
 */
const assetIdValidation = [
  param('id')
    .isInt()
    .withMessage('Asset ID must be an integer'),
  
  validate
];

/**
 * Query validation for search, pagination, sorting, filtering
 */
const assetQueryValidation = [
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
    .isIn(['asset_name', 'asset_tag', 'purchase_date', 'purchase_cost', 'created_at'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  query('status')
    .optional()
    .isIn(['available', 'allocated', 'reserved', 'maintenance', 'lost', 'retired', 'disposed'])
    .withMessage('Invalid status filter'),
  
  query('department_id')
    .optional()
    .isInt()
    .withMessage('Department filter must be an integer'),
  
  query('category_id')
    .optional()
    .isInt()
    .withMessage('Category filter must be an integer'),
  
  query('condition')
    .optional()
    .isIn(['new', 'good', 'fair', 'poor', 'damaged'])
    .withMessage('Invalid condition filter'),
  
  query('shared')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('Shared filter must be true or false'),
  
  validate
];

module.exports = {
  createAssetValidation,
  updateAssetValidation,
  updateAssetStatusValidation,
  assetIdValidation,
  assetQueryValidation
};
