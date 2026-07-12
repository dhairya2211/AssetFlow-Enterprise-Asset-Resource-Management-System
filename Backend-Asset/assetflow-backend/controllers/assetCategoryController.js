const AssetCategoryModel = require('../models/assetCategoryModel');
const AssetModel = require('../models/assetModel');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Get all asset categories with search, pagination, and sorting
 * GET /api/v1/categories
 */
const getAllCategories = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;

    let categories = await AssetCategoryModel.getAll();

    // Search
    if (search) {
      const searchTerm = search.toLowerCase();
      categories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm) ||
        (cat.description && cat.description.toLowerCase().includes(searchTerm))
      );
    }

    // Sorting
    categories.sort((a, b) => {
      const aVal = a[sortBy] || '';
      const bVal = b[sortBy] || '';
      const comparison = aVal.localeCompare(bVal);
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Pagination
    const total = categories.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedCategories = categories.slice(startIndex, endIndex);

    return successResponse(res, 'Categories retrieved successfully', {
      categories: paginatedCategories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return errorResponse(res, 'Failed to retrieve categories', null, 500);
  }
};

/**
 * Get category by ID
 * GET /api/v1/categories/:id
 */
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await AssetCategoryModel.getById(id);

    if (!category) {
      return errorResponse(res, 'Category not found', null, 404);
    }

    return successResponse(res, 'Category retrieved successfully', { category });
  } catch (error) {
    console.error('Get category error:', error);
    return errorResponse(res, 'Failed to retrieve category', null, 500);
  }
};

/**
 * Create new asset category
 * POST /api/v1/categories
 */
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category name already exists
    const existingCategory = await AssetCategoryModel.getByName(name);
    if (existingCategory) {
      return errorResponse(res, 'Category name already exists', null, 409);
    }

    const categoryData = {
      name,
      description: description || null
    };

    const categoryId = await AssetCategoryModel.create(categoryData);
    const newCategory = await AssetCategoryModel.getById(categoryId);

    return successResponse(res, 'Category created successfully', { category: newCategory }, 201);
  } catch (error) {
    console.error('Create category error:', error);
    return errorResponse(res, 'Failed to create category', null, 500);
  }
};

/**
 * Update asset category
 * PUT /api/v1/categories/:id
 */
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if category exists
    const existingCategory = await AssetCategoryModel.getById(id);
    if (!existingCategory) {
      return errorResponse(res, 'Category not found', null, 404);
    }

    // Check if new name conflicts with existing categories
    if (name && name.toLowerCase() !== existingCategory.name.toLowerCase()) {
      const nameExists = await AssetCategoryModel.getByName(name);
      if (nameExists) {
        return errorResponse(res, 'Category name already exists', null, 409);
      }
    }

    const categoryData = {
      name: name || existingCategory.name,
      description: description !== undefined ? description : existingCategory.description
    };

    await AssetCategoryModel.update(id, categoryData);
    const updatedCategory = await AssetCategoryModel.getById(id);

    return successResponse(res, 'Category updated successfully', { category: updatedCategory });
  } catch (error) {
    console.error('Update category error:', error);
    return errorResponse(res, 'Failed to update category', null, 500);
  }
};

/**
 * Delete category (check for dependencies)
 * DELETE /api/v1/categories/:id
 */
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const category = await AssetCategoryModel.getById(id);
    if (!category) {
      return errorResponse(res, 'Category not found', null, 404);
    }

    // Check if category has assets
    const assets = await AssetModel.getByCategory(id);
    if (assets && assets.length > 0) {
      return errorResponse(
        res,
        'Cannot delete category. It contains assets. Please reassign assets first.',
        null,
        400
      );
    }

    // Delete category
    await AssetCategoryModel.delete(id);

    return successResponse(res, 'Category deleted successfully');
  } catch (error) {
    console.error('Delete category error:', error);
    return errorResponse(res, 'Failed to delete category', null, 500);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
