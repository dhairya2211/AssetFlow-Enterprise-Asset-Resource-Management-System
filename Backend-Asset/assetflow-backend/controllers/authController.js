const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const { generateToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Register a new user
 * POST /api/v1/auth/register
 */
const register = async (req, res) => {
  try {
    const { full_name, employee_id, email, password, phone, department_id, role } = req.body;

    // Check if email already exists
    const existingEmail = await UserModel.getByEmail(email);
    if (existingEmail) {
      return errorResponse(res, 'Email already registered', null, 409);
    }

    // Check if employee_id already exists
    const existingEmployeeId = await UserModel.getByEmployeeId(employee_id);
    if (existingEmployeeId) {
      return errorResponse(res, 'Employee ID already registered', null, 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const userData = {
      employee_id,
      full_name,
      email,
      password: hashedPassword,
      role: role || 'employee',
      department_id: department_id || null,
      phone: phone || null,
      status: 'active'
    };

    const userId = await UserModel.create(userData);

    // Get created user (without password)
    const newUser = await UserModel.getById(userId);
    delete newUser.password;

    return successResponse(
      res,
      'User registered successfully',
      { user: newUser },
      201
    );
  } catch (error) {
    console.error('Registration error:', error);
    return errorResponse(res, 'Registration failed', null, 500);
  }
};

/**
 * Login user
 * POST /api/v1/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.getByEmail(email);
    if (!user) {
      return errorResponse(res, 'Invalid credentials', null, 401);
    }

    // Check if user is active
    if (user.status !== 'active') {
      return errorResponse(res, 'Account is not active', null, 403);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid credentials', null, 401);
    }

    // Generate JWT token
    const tokenPayload = {
      id: user.id,
      employee_id: user.employee_id,
      email: user.email,
      role: user.role,
      department_id: user.department_id
    };

    const token = generateToken(tokenPayload);

    // Remove password from user object
    delete user.password;

    return successResponse(res, 'Login successful', {
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, 'Login failed', null, 500);
  }
};

/**
 * Get logged-in user profile
 * GET /api/v1/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user with department name
    const user = await UserModel.getById(userId);
    
    if (!user) {
      return errorResponse(res, 'User not found', null, 404);
    }

    // Remove password from response
    delete user.password;

    return successResponse(res, 'Profile retrieved successfully', { user });
  } catch (error) {
    console.error('Get profile error:', error);
    return errorResponse(res, 'Failed to retrieve profile', null, 500);
  }
};

/**
 * Change password
 * PUT /api/v1/auth/change-password
 */
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    // Get user
    const user = await UserModel.getById(userId);
    if (!user) {
      return errorResponse(res, 'User not found', null, 404);
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return errorResponse(res, 'Old password is incorrect', null, 400);
    }

    // Check if new password is same as old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return errorResponse(res, 'New password must be different from old password', null, 400);
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await UserModel.updatePassword(userId, hashedNewPassword);

    return successResponse(res, 'Password changed successfully');
  } catch (error) {
    console.error('Change password error:', error);
    return errorResponse(res, 'Failed to change password', null, 500);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  changePassword
};
