const AssetModel = require('../models/assetModel');
const AssetAllocationModel = require('../models/assetAllocationModel');
const {
  generateAssetTag,
  isSerialNumberUnique,
  validateDepartment,
  validateCategory,
  getDashboardCounts: fetchAssetDashboardCounts,
  filterAssets,
  searchAssets,
  sortAssets,
  paginateAssets
} = require('../services/assetService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Get all assets with search, pagination, sorting, and filtering
 * GET /api/v1/assets
 */
const getAllAssets = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'asset_name', sortOrder = 'asc', status, department_id, category_id, condition, shared } = req.query;

    let assets = await AssetModel.getAll();

    // Apply filters
    assets = filterAssets(assets, { status, department_id, category_id, condition, shared });

    // Apply search
    if (search) {
      assets = searchAssets(assets, search);
    }

    // Apply sorting
    assets = sortAssets(assets, sortBy, sortOrder);

    // Apply pagination
    const result = paginateAssets(assets, page, limit);

    return successResponse(res, 'Assets retrieved successfully', result);
  } catch (error) {
    console.error('Get assets error:', error);
    return errorResponse(res, 'Failed to retrieve assets', null, 500);
  }
};

/**
 * Get asset by ID
 * GET /api/v1/assets/:id
 */
const getAssetById = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await AssetModel.getById(id);

    if (!asset) {
      return errorResponse(res, 'Asset not found', null, 404);
    }

    return successResponse(res, 'Asset retrieved successfully', { asset });
  } catch (error) {
    console.error('Get asset error:', error);
    return errorResponse(res, 'Failed to retrieve asset', null, 500);
  }
};

/**
 * Create new asset
 * POST /api/v1/assets
 */
const createAsset = async (req, res) => {
  try {
    const { asset_name, serial_number, category_id, department_id, purchase_date, purchase_cost, current_condition, status, location, is_shared, remarks } = req.body;

    // Validate category exists
    const categoryExists = await validateCategory(category_id);
    if (!categoryExists) {
      return errorResponse(res, 'Category not found', null, 404);
    }

    // Validate department exists (if provided)
    if (department_id) {
      const departmentExists = await validateDepartment(department_id);
      if (!departmentExists) {
        return errorResponse(res, 'Department not found', null, 404);
      }
    }

    // Check serial number uniqueness (if provided)
    if (serial_number) {
      const isUnique = await isSerialNumberUnique(serial_number);
      if (!isUnique) {
        return errorResponse(res, 'Serial number already exists', null, 409);
      }
    }

    // Generate asset tag
    const asset_tag = await generateAssetTag();

    // Handle image upload
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/assets/${req.file.filename}`;
    }

    const assetData = {
      asset_tag,
      asset_name,
      serial_number: serial_number || null,
      category_id,
      department_id: department_id || null,
      purchase_date: purchase_date || null,
      purchase_cost: purchase_cost || null,
      current_condition: current_condition || 'good',
      status: status || 'available',
      location: location || null,
      is_shared: is_shared || false,
      image: imagePath,
      remarks: remarks || null
    };

    const assetId = await AssetModel.create(assetData);
    const newAsset = await AssetModel.getById(assetId);

    return successResponse(res, 'Asset created successfully', { asset: newAsset }, 201);
  } catch (error) {
    console.error('Create asset error:', error);
    return errorResponse(res, 'Failed to create asset', null, 500);
  }
};

/**
 * Update asset
 * PUT /api/v1/assets/:id
 */
const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { asset_name, serial_number, category_id, department_id, purchase_date, purchase_cost, current_condition, status, location, is_shared, remarks } = req.body;

    // Check if asset exists
    const existingAsset = await AssetModel.getById(id);
    if (!existingAsset) {
      return errorResponse(res, 'Asset not found', null, 404);
    }

    // Validate category exists (if provided)
    if (category_id) {
      const categoryExists = await validateCategory(category_id);
      if (!categoryExists) {
        return errorResponse(res, 'Category not found', null, 404);
      }
    }

    // Validate department exists (if provided)
    if (department_id !== undefined) {
      const departmentExists = await validateDepartment(department_id);
      if (!departmentExists) {
        return errorResponse(res, 'Department not found', null, 404);
      }
    }

    // Check serial number uniqueness (if provided and changed)
    if (serial_number && serial_number !== existingAsset.serial_number) {
      const isUnique = await isSerialNumberUnique(serial_number, id);
      if (!isUnique) {
        return errorResponse(res, 'Serial number already exists', null, 409);
      }
    }

    // Handle image upload
    let imagePath = existingAsset.image;
    if (req.file) {
      imagePath = `/uploads/assets/${req.file.filename}`;
    }

    const assetData = {
      asset_tag: existingAsset.asset_tag,
      asset_name: asset_name || existingAsset.asset_name,
      serial_number: serial_number !== undefined ? serial_number : existingAsset.serial_number,
      category_id: category_id || existingAsset.category_id,
      department_id: department_id !== undefined ? department_id : existingAsset.department_id,
      purchase_date: purchase_date !== undefined ? purchase_date : existingAsset.purchase_date,
      purchase_cost: purchase_cost !== undefined ? purchase_cost : existingAsset.purchase_cost,
      current_condition: current_condition || existingAsset.current_condition,
      status: status || existingAsset.status,
      location: location !== undefined ? location : existingAsset.location,
      is_shared: is_shared !== undefined ? is_shared : existingAsset.is_shared,
      image: imagePath,
      remarks: remarks !== undefined ? remarks : existingAsset.remarks
    };

    await AssetModel.update(id, assetData);
    const updatedAsset = await AssetModel.getById(id);

    return successResponse(res, 'Asset updated successfully', { asset: updatedAsset });
  } catch (error) {
    console.error('Update asset error:', error);
    return errorResponse(res, 'Failed to update asset', null, 500);
  }
};

/**
 * Update asset status
 * PATCH /api/v1/assets/:id/status
 */
const updateAssetStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if asset exists
    const existingAsset = await AssetModel.getById(id);
    if (!existingAsset) {
      return errorResponse(res, 'Asset not found', null, 404);
    }

    await AssetModel.updateStatus(id, status);
    const updatedAsset = await AssetModel.getById(id);

    return successResponse(res, 'Asset status updated successfully', { asset: updatedAsset });
  } catch (error) {
    console.error('Update asset status error:', error);
    return errorResponse(res, 'Failed to update asset status', null, 500);
  }
};

/**
 * Delete asset
 * DELETE /api/v1/assets/:id
 */
const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if asset exists
    const asset = await AssetModel.getById(id);
    if (!asset) {
      return errorResponse(res, 'Asset not found', null, 404);
    }

    // Check if asset has active allocations
    const allocations = await AssetAllocationModel.getByAsset(id);
    const activeAllocations = allocations.filter(a => a.status === 'active');
    
    if (activeAllocations.length > 0) {
      return errorResponse(
        res,
        'Cannot delete asset. It has active allocations. Please return assets first.',
        null,
        400
      );
    }

    // Delete asset
    await AssetModel.delete(id);

    return successResponse(res, 'Asset deleted successfully');
  } catch (error) {
    console.error('Delete asset error:', error);
    return errorResponse(res, 'Failed to delete asset', null, 500);
  }
};

/**
 * Get dashboard counts
 * GET /api/v1/assets/dashboard/counts
 */
const getDashboardCounts = async (req, res) => {
  try {
    const counts = await fetchAssetDashboardCounts();
    return successResponse(res, 'Dashboard counts retrieved successfully', { counts });
  } catch (error) {
    console.error('Get dashboard counts error:', error);
    return errorResponse(res, 'Failed to retrieve dashboard counts', null, 500);
  }
};

/**
 * Get available assets
 * GET /api/v1/assets/available
 */
const getAvailableAssets = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    let assets = await AssetModel.getAvailable();
    
    // Apply pagination
    const result = paginateAssets(assets, page, limit);

    return successResponse(res, 'Available assets retrieved successfully', result);
  } catch (error) {
    console.error('Get available assets error:', error);
    return errorResponse(res, 'Failed to retrieve available assets', null, 500);
  }
};

/**
 * Get recent assets
 * GET /api/v1/assets/recent
 */
const getRecentAssets = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    let assets = await AssetModel.getAll();
    
    // Sort by created_at descending
    assets = sortAssets(assets, 'created_at', 'desc');
    
    // Limit results
    const recentAssets = assets.slice(0, parseInt(limit));

    return successResponse(res, 'Recent assets retrieved successfully', { assets: recentAssets });
  } catch (error) {
    console.error('Get recent assets error:', error);
    return errorResponse(res, 'Failed to retrieve recent assets', null, 500);
  }
};

/**
 * Search assets
 * GET /api/v1/assets/search
 */
const searchAssetsEndpoint = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return errorResponse(res, 'Search query is required', null, 400);
    }

    let assets = await AssetModel.getAll();
    
    // Apply search
    assets = searchAssets(assets, q);
    
    // Apply pagination
    const result = paginateAssets(assets, page, limit);

    return successResponse(res, 'Asset search completed successfully', result);
  } catch (error) {
    console.error('Search assets error:', error);
    return errorResponse(res, 'Failed to search assets', null, 500);
  }
};

module.exports = {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  updateAssetStatus,
  deleteAsset,
  getDashboardCounts,
  getAvailableAssets,
  getRecentAssets,
  searchAssetsEndpoint
};
