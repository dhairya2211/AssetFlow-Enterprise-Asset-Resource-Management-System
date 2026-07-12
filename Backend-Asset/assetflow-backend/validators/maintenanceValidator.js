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
 * Create maintenance validation
 */
const createMaintenanceValidation = [
  body('asset_id')
    .notEmpty()
    .withMessage('Asset ID is required')
    .isInt()
    .withMessage('Asset ID must be an integer'),
  
  body('issue')
    .notEmpty()
    .withMessage('Issue description is required')
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Issue description must not exceed 2000 characters'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Priority must be low, medium, high, or critical'),
  
  body('assigned_to')
    .optional()
    .isInt()
    .withMessage('Assigned to must be an integer'),
  
  validate
];

/**
 * Update maintenance validation
 */
const updateMaintenanceValidation = [
  param('id')
    .isInt()
    .withMessage('Maintenance ID must be an integer'),
  
  body('issue')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Issue description must not exceed 2000 characters'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Priority must be low, medium, high, or critical'),
  
  body('assigned_to')
    .optional()
    .isInt()
    .withMessage('Assigned to must be an integer'),
  
  validate
];

/**
 * Assign maintenance validation
 */
const assignMaintenanceValidation = [
  param('id')
    .isInt()
    .withMessage('Maintenance ID must be an integer'),
  
  body('assigned_to')
    .notEmpty()
    .withMessage('Assigned to is required')
    .isInt()
    .withMessage('Assigned to must be an integer'),
  
  validate
];

/**
 * Maintenance ID validation
 */
const maintenanceIdValidation = [
  param('id')
    .isInt()
    .withMessage('Maintenance ID must be an integer'),
  
  validate
];

/**
 * Query validation for search, pagination, sorting, filtering
 */
const maintenanceQueryValidation = [
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
    .isIn(['created_at', 'priority', 'resolved_at'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  query('status')
    .optional()
    .isIn(['pending', 'in_progress', 'resolved'])
    .withMessage('Invalid status filter'),
  
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Invalid priority filter'),
  
  query('technician')
    .optional()
    .isInt()
    .withMessage('Technician filter must be an integer'),
  
  validate
];

module.exports = {
  createMaintenanceValidation,
  updateMaintenanceValidation,
  assignMaintenanceValidation,
  maintenanceIdValidation,
  maintenanceQueryValidation
};
