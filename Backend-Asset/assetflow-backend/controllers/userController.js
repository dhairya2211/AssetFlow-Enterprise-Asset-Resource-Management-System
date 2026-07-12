const UserModel = require('../models/userModel');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Get all users with search, pagination, sorting, and filtering
 * GET /api/v1/users
 */
const getAllUsers = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'full_name', sortOrder = 'asc', status, role, department } = req.query;

    let users = await UserModel.getAll();

    // Filter by status
    if (status) {
      users = users.filter(user => user.status === status);
    }

    // Filter by role
    if (role) {
      users = users.filter(user => user.role === role);
    }

    // Filter by department
    if (department) {
      users = users.filter(user => user.department_id === parseInt(department));
    }

    // Search
    if (search) {
      const searchTerm = search.toLowerCase();
      users = users.filter(user =>
        user.full_name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.employee_id.toLowerCase().includes(searchTerm)
      );
    }

    // Sorting
    users.sort((a, b) => {
      const aVal = a[sortBy] || '';
      const bVal = b[sortBy] || '';
      const comparison = aVal.localeCompare(bVal);
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Remove passwords from all users
    users = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    // Pagination
    const total = users.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = users.slice(startIndex, endIndex);

    return successResponse(res, 'Users retrieved successfully', {
      users: paginatedUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    return errorResponse(res, 'Failed to retrieve users', null, 500);
  }
};

/**
 * Get user by ID
 * GET /api/v1/users/:id
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.getById(id);

    if (!user) {
      return errorResponse(res, 'User not found', null, 404);
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return successResponse(res, 'User retrieved successfully', { user: userWithoutPassword });
  } catch (error) {
    console.error('Get user error:', error);
    return errorResponse(res, 'Failed to retrieve user', null, 500);
  }
};

/**
 * Update user
 * PUT /api/v1/users/:id
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, department_id, role, status } = req.body;

    // Check if user exists
    const existingUser = await UserModel.getById(id);
    if (!existingUser) {
      return errorResponse(res, 'User not found', null, 404);
    }

    // Prevent admin from deleting themselves
    if (req.user.id === parseInt(id) && status === 'inactive') {
      return errorResponse(res, 'Cannot deactivate your own account', null, 400);
    }

    const userData = {
      employee_id: existingUser.employee_id,
      full_name: full_name || existingUser.full_name,
      email: existingUser.email,
      role: role || existingUser.role,
      department_id: department_id !== undefined ? department_id : existingUser.department_id,
      phone: phone !== undefined ? phone : existingUser.phone,
      status: status || existingUser.status
    };

    await UserModel.update(id, userData);
    const updatedUser = await UserModel.getById(id);

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return successResponse(res, 'User updated successfully', { user: userWithoutPassword });
  } catch (error) {
    console.error('Update user error:', error);
    return errorResponse(res, 'Failed to update user', null, 500);
  }
};

/**
 * Update user status
 * PATCH /api/v1/users/status
 */
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if user exists
    const existingUser = await UserModel.getById(id);
    if (!existingUser) {
      return errorResponse(res, 'User not found', null, 404);
    }

    // Prevent admin from deactivating themselves
    if (req.user.id === parseInt(id) && status === 'inactive') {
      return errorResponse(res, 'Cannot deactivate your own account', null, 400);
    }

    const userData = {
      employee_id: existingUser.employee_id,
      full_name: existingUser.full_name,
      email: existingUser.email,
      role: existingUser.role,
      department_id: existingUser.department_id,
      phone: existingUser.phone,
      status
    };

    await UserModel.update(id, userData);
    const updatedUser = await UserModel.getById(id);

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return successResponse(res, 'User status updated successfully', { user: userWithoutPassword });
  } catch (error) {
    console.error('Update user status error:', error);
    return errorResponse(res, 'Failed to update user status', null, 500);
  }
};

/**
 * Delete user
 * DELETE /api/v1/users/:id
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await UserModel.getById(id);
    if (!user) {
      return errorResponse(res, 'User not found', null, 404);
    }

    // Prevent admin from deleting themselves
    if (req.user.id === parseInt(id)) {
      return errorResponse(res, 'Cannot delete your own account', null, 400);
    }

    // Delete user
    await UserModel.delete(id);

    return successResponse(res, 'User deleted successfully');
  } catch (error) {
    console.error('Delete user error:', error);
    return errorResponse(res, 'Failed to delete user', null, 500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser
};
