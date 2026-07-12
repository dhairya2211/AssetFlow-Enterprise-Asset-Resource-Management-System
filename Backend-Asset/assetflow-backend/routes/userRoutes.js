const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');
const {
  updateUserValidation,
  updateUserStatusValidation,
  userIdValidation,
  userQueryValidation
} = require('../validators/userValidator');

/**
 * @route   GET /api/v1/users
 * @desc    Get all users with search, pagination, sorting, filtering
 * @access  Private (Admin only)
 */
router.get('/', authenticate, authorizeRoles('admin'), userQueryValidation, userController.getAllUsers);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID
 * @access  Private (Admin only)
 */
router.get('/:id', authenticate, authorizeRoles('admin'), userIdValidation, userController.getUserById);

/**
 * @route   PUT /api/v1/users/:id
 * @desc    Update user
 * @access  Private (Admin only)
 */
router.put('/:id', authenticate, authorizeRoles('admin'), updateUserValidation, userController.updateUser);

/**
 * @route   PATCH /api/v1/users/:id/status
 * @desc    Update user status
 * @access  Private (Admin only)
 */
router.patch('/:id/status', authenticate, authorizeRoles('admin'), updateUserStatusValidation, userController.updateUserStatus);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete user (admin cannot delete themselves)
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorizeRoles('admin'), userIdValidation, userController.deleteUser);

module.exports = router;
