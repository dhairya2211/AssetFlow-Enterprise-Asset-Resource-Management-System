const express = require('express');
const router = express.Router();
const assetCategoryController = require('../controllers/assetCategoryController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createCategoryValidation,
  updateCategoryValidation,
  categoryIdValidation,
  categoryQueryValidation
} = require('../validators/assetCategoryValidator');

/**
 * @route   GET /api/v1/categories
 * @desc    Get all asset categories with search, pagination, sorting
 * @access  Private (Authenticated)
 */
router.get('/', authenticate, categoryQueryValidation, assetCategoryController.getAllCategories);

/**
 * @route   GET /api/v1/categories/:id
 * @desc    Get category by ID
 * @access  Private (Authenticated)
 */
router.get('/:id', authenticate, categoryIdValidation, assetCategoryController.getCategoryById);

/**
 * @route   POST /api/v1/categories
 * @desc    Create new asset category
 * @access  Private (Admin only)
 */
router.post('/', authenticate, authorizeRoles('admin'), createCategoryValidation, assetCategoryController.createCategory);

/**
 * @route   PUT /api/v1/categories/:id
 * @desc    Update asset category
 * @access  Private (Admin only)
 */
router.put('/:id', authenticate, authorizeRoles('admin'), updateCategoryValidation, assetCategoryController.updateCategory);

/**
 * @route   DELETE /api/v1/categories/:id
 * @desc    Delete category (checks for dependencies)
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorizeRoles('admin'), categoryIdValidation, assetCategoryController.deleteCategory);

module.exports = router;
