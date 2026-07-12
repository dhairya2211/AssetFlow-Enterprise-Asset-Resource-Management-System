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
 * Create booking validation
 */
const createBookingValidation = [
  body('resource_name')
    .notEmpty()
    .withMessage('Resource name is required')
    .trim()
    .isLength({ max: 255 })
    .withMessage('Resource name must be less than 255 characters'),
  
  body('booking_date')
    .notEmpty()
    .withMessage('Booking date is required')
    .isISO8601()
    .withMessage('Booking date must be a valid date'),
  
  body('start_time')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
    .withMessage('Start time must be in HH:MM or HH:MM:SS format'),
  
  body('end_time')
    .notEmpty()
    .withMessage('End time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
    .withMessage('End time must be in HH:MM or HH:MM:SS format'),
  
  body('purpose')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Purpose must not exceed 1000 characters'),
  
  validate
];

/**
 * Update booking validation
 */
const updateBookingValidation = [
  param('id')
    .isInt()
    .withMessage('Booking ID must be an integer'),
  
  body('booking_date')
    .optional()
    .isISO8601()
    .withMessage('Booking date must be a valid date'),
  
  body('start_time')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
    .withMessage('Start time must be in HH:MM or HH:MM:SS format'),
  
  body('end_time')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
    .withMessage('End time must be in HH:MM or HH:MM:SS format'),
  
  body('purpose')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Purpose must not exceed 1000 characters'),
  
  validate
];

/**
 * Booking ID validation
 */
const bookingIdValidation = [
  param('id')
    .isInt()
    .withMessage('Booking ID must be an integer'),
  
  validate
];

/**
 * Query validation for search, pagination, sorting, filtering
 */
const bookingQueryValidation = [
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
    .isIn(['booking_date', 'start_time', 'created_at'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
    .withMessage('Invalid status filter'),
  
  query('resource')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Resource filter must not be empty'),
  
  query('date')
    .optional()
    .isISO8601()
    .withMessage('Date filter must be a valid date'),
  
  validate
];

/**
 * Calendar query validation
 */
const calendarQueryValidation = [
  query('start_date')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  
  query('end_date')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date'),
  
  validate
];

module.exports = {
  createBookingValidation,
  updateBookingValidation,
  bookingIdValidation,
  bookingQueryValidation,
  calendarQueryValidation
};
