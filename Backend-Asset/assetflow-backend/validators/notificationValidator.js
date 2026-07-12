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
 * Notification ID validation
 */
const notificationIdValidation = [
  param('id')
    .isInt()
    .withMessage('Notification ID must be an integer'),
  
  validate
];

/**
 * Query validation for search, pagination, sorting, filtering
 */
const notificationQueryValidation = [
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
  
  query('type')
    .optional()
    .isString()
    .withMessage('Type must be a string'),
  
  query('read')
    .optional()
    .isBoolean()
    .withMessage('Read must be a boolean'),
  
  validate
];

module.exports = {
  notificationIdValidation,
  notificationQueryValidation
};
