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
 * Create transfer request validation
 */
const createTransferValidation = [
  body('asset_id')
    .notEmpty()
    .withMessage('Asset ID is required')
    .isInt()
    .withMessage('Asset ID must be an integer'),
  
  body('from_user')
    .notEmpty()
    .withMessage('From user ID is required')
    .isInt()
    .withMessage('From user ID must be an integer'),
  
  body('to_user')
    .notEmpty()
    .withMessage('To user ID is required')
    .isInt()
    .withMessage('To user ID must be an integer')
    .custom((value, { req }) => {
      if (value === req.body.from_user) {
        throw new Error('Cannot transfer to yourself');
      }
      return true;
    }),
  
  body('reason')
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Reason must be between 1 and 1000 characters'),
  
  validate
];

/**
 * Transfer ID validation
 */
const transferIdValidation = [
  param('id')
    .isInt()
    .withMessage('Transfer ID must be an integer'),
  
  validate
];

/**
 * Query validation for search, pagination, sorting, filtering
 */
const transferQueryValidation = [
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
    .isIn(['created_at', 'approved_at'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  query('status')
    .optional()
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Invalid status filter'),
  
  query('from_user')
    .optional()
    .isInt()
    .withMessage('From user filter must be an integer'),
  
  query('to_user')
    .optional()
    .isInt()
    .withMessage('To user filter must be an integer'),
  
  query('asset')
    .optional()
    .isInt()
    .withMessage('Asset filter must be an integer'),
  
  validate
];

module.exports = {
  createTransferValidation,
  transferIdValidation,
  transferQueryValidation
};
