const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createDepartmentValidation,
  updateDepartmentValidation,
  departmentIdValidation,
  departmentQueryValidation
} = require('../validators/departmentValidator');

/**
 * @route   GET /api/v1/departments
 * @desc    Get all departments with search, pagination, sorting, filtering
 * @access  Private (Authenticated)
 */
router.get('/', authenticate, departmentQueryValidation, departmentController.getAllDepartments);

/**
 * @route   GET /api/v1/departments/:id
 * @desc    Get department by ID
 * @access  Private (Authenticated)
 */
router.get('/:id', authenticate, departmentIdValidation, departmentController.getDepartmentById);

/**
 * @route   POST /api/v1/departments
 * @desc    Create new department
 * @access  Private (Admin only)
 */
router.post('/', authenticate, authorizeRoles('admin'), createDepartmentValidation, departmentController.createDepartment);

/**
 * @route   PUT /api/v1/departments/:id
 * @desc    Update department
 * @access  Private (Admin only)
 */
router.put('/:id', authenticate, authorizeRoles('admin'), updateDepartmentValidation, departmentController.updateDepartment);

/**
 * @route   DELETE /api/v1/departments/:id
 * @desc    Delete department (checks for dependencies)
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorizeRoles('admin'), departmentIdValidation, departmentController.deleteDepartment);

module.exports = router;
