const AssetAllocationModel = require('../models/assetAllocationModel');
const {
  createAllocation: createAllocationService,
  returnAsset,
  getDashboardCounts: getDashboardCountsService,
  filterAllocations,
  searchAllocations,
  sortAllocations,
  paginateAllocations
} = require('../services/assetAllocationService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Get all allocations with search, pagination, sorting, and filtering
 * GET /api/v1/allocations
 */
const getAllAllocations = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'allocated_date', sortOrder = 'asc', status, user, department, date_from, date_to } = req.query;

    let allocations = await AssetAllocationModel.getAll();

    // Apply filters
    allocations = filterAllocations(allocations, { status, user, department, date_from, date_to });

    // Apply search
    if (search) {
      allocations = searchAllocations(allocations, search);
    }

    // Apply sorting
    allocations = sortAllocations(allocations, sortBy, sortOrder);

    // Apply pagination
    const result = paginateAllocations(allocations, page, limit);

    return successResponse(res, 'Allocations retrieved successfully', result);
  } catch (error) {
    console.error('Get allocations error:', error);
    return errorResponse(res, 'Failed to retrieve allocations', null, 500);
  }
};

/**
 * Get allocation by ID
 * GET /api/v1/allocations/:id
 */
const getAllocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const allocation = await AssetAllocationModel.getById(id);

    if (!allocation) {
      return errorResponse(res, 'Allocation not found', null, 404);
    }

    return successResponse(res, 'Allocation retrieved successfully', { allocation });
  } catch (error) {
    console.error('Get allocation error:', error);
    return errorResponse(res, 'Failed to retrieve allocation', null, 500);
  }
};

/**
 * Create new allocation
 * POST /api/v1/allocations
 */
const createAllocation = async (req, res) => {
  try {
    const { asset_id, user_id, allocated_date, expected_return, remarks } = req.body;

    const allocationId = await createAllocationService({
      asset_id,
      user_id,
      allocated_date,
      expected_return,
      remarks
    });

    const newAllocation = await AssetAllocationModel.getById(allocationId);

    return successResponse(res, 'Asset allocated successfully', { allocation: newAllocation }, 201);
  } catch (error) {
    console.error('Create allocation error:', error);
    return errorResponse(res, error.message || 'Failed to allocate asset', null, 400);
  }
};

/**
 * Update allocation
 * PUT /api/v1/allocations/:id
 */
const updateAllocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { expected_return, remarks } = req.body;

    // Check if allocation exists
    const existingAllocation = await AssetAllocationModel.getById(id);
    if (!existingAllocation) {
      return errorResponse(res, 'Allocation not found', null, 404);
    }

    await AssetAllocationModel.update(id, { expected_return, remarks });
    const updatedAllocation = await AssetAllocationModel.getById(id);

    return successResponse(res, 'Allocation updated successfully', { allocation: updatedAllocation });
  } catch (error) {
    console.error('Update allocation error:', error);
    return errorResponse(res, 'Failed to update allocation', null, 500);
  }
};

/**
 * Return asset
 * PATCH /api/v1/allocations/:id/return
 */
const returnAllocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { returned_date, remarks } = req.body;

    await returnAsset(id, returned_date);

    const allocation = await AssetAllocationModel.getById(id);

    return successResponse(res, 'Asset returned successfully', { allocation });
  } catch (error) {
    console.error('Return allocation error:', error);
    return errorResponse(res, error.message || 'Failed to return asset', null, 400);
  }
};

/**
 * Delete allocation
 * DELETE /api/v1/allocations/:id
 */
const deleteAllocation = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if allocation exists
    const allocation = await AssetAllocationModel.getById(id);
    if (!allocation) {
      return errorResponse(res, 'Allocation not found', null, 404);
    }

    // Cannot delete active allocations
    if (allocation.status === 'active') {
      return errorResponse(res, 'Cannot delete active allocation. Please return the asset first.', null, 400);
    }

    await AssetAllocationModel.delete(id);

    return successResponse(res, 'Allocation deleted successfully');
  } catch (error) {
    console.error('Delete allocation error:', error);
    return errorResponse(res, 'Failed to delete allocation', null, 500);
  }
};

/**
 * Get active allocations
 * GET /api/v1/allocations/active
 */
const getActiveAllocations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    let allocations = await AssetAllocationModel.getActive();
    
    // Apply pagination
    const result = paginateAllocations(allocations, page, limit);

    return successResponse(res, 'Active allocations retrieved successfully', result);
  } catch (error) {
    console.error('Get active allocations error:', error);
    return errorResponse(res, 'Failed to retrieve active allocations', null, 500);
  }
};

/**
 * Get overdue allocations
 * GET /api/v1/allocations/overdue
 */
const getOverdueAllocations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    let allocations = await AssetAllocationModel.getOverdue();
    
    // Apply pagination
    const result = paginateAllocations(allocations, page, limit);

    return successResponse(res, 'Overdue allocations retrieved successfully', result);
  } catch (error) {
    console.error('Get overdue allocations error:', error);
    return errorResponse(res, 'Failed to retrieve overdue allocations', null, 500);
  }
};

/**
 * Get dashboard counts
 * GET /api/v1/allocations/dashboard
 */
const getDashboardCounts = async (req, res) => {
  try {
    const counts = await getDashboardCountsService();
    return successResponse(res, 'Dashboard counts retrieved successfully', { counts });
  } catch (error) {
    console.error('Get dashboard counts error:', error);
    return errorResponse(res, 'Failed to retrieve dashboard counts', null, 500);
  }
};

module.exports = {
  getAllAllocations,
  getAllocationById,
  createAllocation,
  updateAllocation,
  returnAllocation,
  deleteAllocation,
  getActiveAllocations,
  getOverdueAllocations,
  getDashboardCounts
};
