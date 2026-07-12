const DepartmentModel = require('../models/departmentModel');
const UserModel = require('../models/userModel');
const AssetModel = require('../models/assetModel');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Get all departments with search, pagination, sorting, and filtering
 * GET /api/v1/departments
 */
const getAllDepartments = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc', status } = req.query;

    let departments = await DepartmentModel.getAll();

    // Filter by status
    if (status) {
      departments = departments.filter(dept => dept.status === status);
    }

    // Search
    if (search) {
      const searchTerm = search.toLowerCase();
      departments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm) ||
        (dept.description && dept.description.toLowerCase().includes(searchTerm))
      );
    }

    // Sorting
    departments.sort((a, b) => {
      const aVal = a[sortBy] || '';
      const bVal = b[sortBy] || '';
      const comparison = aVal.localeCompare(bVal);
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Pagination
    const total = departments.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedDepartments = departments.slice(startIndex, endIndex);

    return successResponse(res, 'Departments retrieved successfully', {
      departments: paginatedDepartments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get departments error:', error);
    return errorResponse(res, 'Failed to retrieve departments', null, 500);
  }
};

/**
 * Get department by ID
 * GET /api/v1/departments/:id
 */
const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await DepartmentModel.getById(id);

    if (!department) {
      return errorResponse(res, 'Department not found', null, 404);
    }

    return successResponse(res, 'Department retrieved successfully', { department });
  } catch (error) {
    console.error('Get department error:', error);
    return errorResponse(res, 'Failed to retrieve department', null, 500);
  }
};

/**
 * Create new department
 * POST /api/v1/departments
 */
const createDepartment = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    // Check if department name already exists
    const existingDepartments = await DepartmentModel.getAll();
    const nameExists = existingDepartments.some(dept => dept.name.toLowerCase() === name.toLowerCase());

    if (nameExists) {
      return errorResponse(res, 'Department name already exists', null, 409);
    }

    const departmentData = {
      name,
      description: description || null,
      status: status || 'active'
    };

    const departmentId = await DepartmentModel.create(departmentData);
    const newDepartment = await DepartmentModel.getById(departmentId);

    return successResponse(res, 'Department created successfully', { department: newDepartment }, 201);
  } catch (error) {
    console.error('Create department error:', error);
    return errorResponse(res, 'Failed to create department', null, 500);
  }
};

/**
 * Update department
 * PUT /api/v1/departments/:id
 */
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    // Check if department exists
    const existingDepartment = await DepartmentModel.getById(id);
    if (!existingDepartment) {
      return errorResponse(res, 'Department not found', null, 404);
    }

    // Check if new name conflicts with existing departments
    if (name && name.toLowerCase() !== existingDepartment.name.toLowerCase()) {
      const allDepartments = await DepartmentModel.getAll();
      const nameExists = allDepartments.some(dept => 
        dept.id !== parseInt(id) && dept.name.toLowerCase() === name.toLowerCase()
      );

      if (nameExists) {
        return errorResponse(res, 'Department name already exists', null, 409);
      }
    }

    const departmentData = {
      name: name || existingDepartment.name,
      description: description !== undefined ? description : existingDepartment.description,
      status: status || existingDepartment.status
    };

    await DepartmentModel.update(id, departmentData);
    const updatedDepartment = await DepartmentModel.getById(id);

    return successResponse(res, 'Department updated successfully', { department: updatedDepartment });
  } catch (error) {
    console.error('Update department error:', error);
    return errorResponse(res, 'Failed to update department', null, 500);
  }
};

/**
 * Delete department (soft delete - check for dependencies)
 * DELETE /api/v1/departments/:id
 */
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if department exists
    const department = await DepartmentModel.getById(id);
    if (!department) {
      return errorResponse(res, 'Department not found', null, 404);
    }

    // Check if department has users
    const users = await UserModel.getByDepartment(id);
    if (users && users.length > 0) {
      return errorResponse(
        res,
        'Cannot delete department. It contains users. Please reassign users first.',
        null,
        400
      );
    }

    // Check if department has assets
    const assets = await AssetModel.getByDepartment(id);
    if (assets && assets.length > 0) {
      return errorResponse(
        res,
        'Cannot delete department. It contains assets. Please reassign assets first.',
        null,
        400
      );
    }

    // Delete department
    await DepartmentModel.delete(id);

    return successResponse(res, 'Department deleted successfully');
  } catch (error) {
    console.error('Delete department error:', error);
    return errorResponse(res, 'Failed to delete department', null, 500);
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
