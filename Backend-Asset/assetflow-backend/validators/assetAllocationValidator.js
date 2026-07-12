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
 * Create allocation validation
 */
const createAllocationValidation = [
  body('asset_id')
    .notEmpty()
    .withMessage('Asset ID is required')
    .isInt()
    .withMessage('Asset ID must be an integer'),
  
  body('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .isInt()
    .withMessage('User ID must be an integer'),
  
  body('allocated_date')
    .notEmpty()
    .withMessage('Allocated date is required')
    .isISO8601()
    .withMessage('Allocated date must be a valid date'),
  
  body('expected_return')
    .optional()
    .isISO8601()
    .withMessage('Expected return date must be a valid date')
    .custom((value, { req }) => {
      if (value && new Date(value) < new Date(req.body.allocated_date)) {
        throw new Error('Expected return date must be after allocated date');
      }
      return true;
    }),
  
  body('remarks')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Remarks must not exceed 1000 characters'),
  
  validate
];

/**
 * Update allocation validation
 */
const updateAllocationValidation = [
  param('id')
    .isInt()
    .withMessage('Allocation ID must be an integer'),
  
  body('expected_return')
    .optional()
    .isISO8601()
    .withMessage('Expected return date must be a valid date'),
  
  body('remarks')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Remarks must not exceed 1000 characters'),
  
  validate
];

/**
 * Return allocation validation
 */
const returnAllocationValidation = [
  param('id')
    .isInt()
    .withMessage('Allocation ID must be an integer'),
  
  body('returned_date')
    .optional()
    .isISO8601()
    .withMessage('Returned date must be a valid date'),
  
  body('remarks')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Remarks must not exceed 1000 characters'),
  
  validate
];

/**
 * Allocation ID validation
 */
const allocationIdValidation = [
  param('id')
    .isInt()
    .withMessage('Allocation ID must be an integer'),
  
  validate
];

/**
 * Query validation for search, pagination, sorting, filtering
 */
const allocationQueryValidation = [
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
    .isIn(['allocated_date', 'expected_return', 'returned_date', 'created_at'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  query('status')
    .optional()
    .isIn(['active', 'returned', 'overdue'])
    .withMessage('Invalid status filter'),
  
  query('user')
    .optional()
    .isInt()
    .withMessage('User filter must be an integer'),
  
  query('department')
    .optional()
    .isInt()
    .withMessage('Department filter must be an integer'),
  
  query('date_from')
    .optional()
    .isISO8601()
    .withMessage('Date from must be a valid date'),
  
  query('date_to')
    .optional()
    .isISO8601()
    .withMessage('Date to must be a valid date'),
  
  validate
];

module.exports = {
  createAllocationValidation,
  updateAllocationValidation,
  returnAllocationValidation,
  allocationIdValidation,
  allocationQueryValidation
};
