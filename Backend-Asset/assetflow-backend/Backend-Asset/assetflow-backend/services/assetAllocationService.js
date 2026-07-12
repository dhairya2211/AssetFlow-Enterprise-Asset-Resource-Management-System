const AssetModel = require('../models/assetModel');
const UserModel = require('../models/userModel');
const AssetAllocationModel = require('../models/assetAllocationModel');
const TransferRequestModel = require('../models/transferRequestModel');
const { withTransaction } = require('../config/database');

/**
 * Check if asset can be allocated
 * Asset must be available
 */
const canAllocateAsset = async (assetId) => {
  try {
    const asset = await AssetModel.getById(assetId);
    
    if (!asset) {
      return { canAllocate: false, reason: 'Asset not found' };
    }
    
    // Check asset status - only available assets can be allocated
    if (asset.status !== 'available') {
      return { canAllocate: false, reason: `Asset is ${asset.status}. Only available assets can be allocated` };
    }
    
    // Check if asset has active allocation
    const activeAllocations = await AssetAllocationModel.getByAsset(assetId);
    const hasActiveAllocation = activeAllocations.some(a => a.status === 'active');
    
    if (hasActiveAllocation) {
      return { canAllocate: false, reason: 'Asset already has an active allocation' };
    }
    
    return { canAllocate: true, asset };
  } catch (error) {
    console.error('Error checking asset allocation eligibility:', error);
    return { canAllocate: false, reason: 'Failed to check asset status' };
  }
};

/**
 * Check if user exists
 */
const validateUser = async (userId) => {
  try {
    const user = await UserModel.getById(userId);
    return !!user;
  } catch (error) {
    console.error('Error validating user:', error);
    return false;
  }
};

/**
 * Create allocation and update asset status
 */
const createAllocation = async (allocationData) => {
  try {
    const { asset_id, user_id, allocated_date, expected_return, remarks } = allocationData;
    
    // Check if asset can be allocated
    const assetCheck = await canAllocateAsset(asset_id);
    if (!assetCheck.canAllocate) {
      throw new Error(assetCheck.reason);
    }
    
    // Check if user exists
    const userExists = await validateUser(user_id);
    if (!userExists) {
      throw new Error('User not found');
    }
    
    // Create allocation and update asset status atomically
    const allocationId = await withTransaction(async (connection) => {
      const id = await AssetAllocationModel.create({
        asset_id,
        user_id,
        allocated_date,
        expected_return: expected_return || null,
        status: 'active',
        remarks: remarks || null
      }, connection);

      await AssetModel.updateStatus(asset_id, 'allocated', connection);
      return id;
    });

    return allocationId;
  } catch (error) {
    console.error('Error creating allocation:', error);
    throw error;
  }
};

/**
 * Return asset and update asset status
 */
const returnAsset = async (allocationId, returnedDate = null) => {
  try {
    // Get allocation
    const allocation = await AssetAllocationModel.getById(allocationId);
    
    if (!allocation) {
      throw new Error('Allocation not found');
    }
    
    if (allocation.status !== 'active') {
      throw new Error('Allocation is not active');
    }
    
    // Return allocation and update asset status atomically
    await withTransaction(async (connection) => {
      await AssetAllocationModel.returnAsset(allocationId, returnedDate, connection);
      await AssetModel.updateStatus(allocation.asset_id, 'available', connection);
    });

    return true;
  } catch (error) {
    console.error('Error returning asset:', error);
    throw error;
  }
};

/**
 * Get dashboard counts
 */
const getDashboardCounts = async () => {
  try {
    const allAllocations = await AssetAllocationModel.getAll();
    const activeAllocations = await AssetAllocationModel.getActive();
    const overdueAllocations = await AssetAllocationModel.getOverdue();
    const allTransfers = await TransferRequestModel.getAll();

    const counts = {
      totalAllocations: allAllocations.length,
      activeAllocations: activeAllocations.length,
      returnedAllocations: allAllocations.filter((a) => a.status === 'returned').length,
      overdueAllocations: overdueAllocations.length,
      pendingTransfers: allTransfers.filter((t) => t.status === 'pending').length,
      approvedTransfers: allTransfers.filter((t) => t.status === 'approved').length,
      rejectedTransfers: allTransfers.filter((t) => t.status === 'rejected').length
    };

    return counts;
  } catch (error) {
    console.error('Error getting dashboard counts:', error);
    throw error;
  }
};

/**
 * Filter allocations
 */
const filterAllocations = (allocations, filters) => {
  let filtered = [...allocations];
  
  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(allocation => allocation.status === filters.status);
  }
  
  // Filter by user
  if (filters.user) {
    filtered = filtered.filter(allocation => allocation.user_id === parseInt(filters.user));
  }
  
  // Filter by department (via asset)
  if (filters.department) {
    filtered = filtered.filter(allocation => allocation.department_id === parseInt(filters.department));
  }
  
  // Filter by date range
  if (filters.date_from) {
    const fromDate = new Date(filters.date_from);
    filtered = filtered.filter(allocation => new Date(allocation.allocated_date) >= fromDate);
  }
  
  if (filters.date_to) {
    const toDate = new Date(filters.date_to);
    filtered = filtered.filter(allocation => new Date(allocation.allocated_date) <= toDate);
  }
  
  return filtered;
};

/**
 * Search allocations
 */
const searchAllocations = (allocations, searchTerm) => {
  if (!searchTerm) return allocations;
  
  const term = searchTerm.toLowerCase();
  return allocations.filter(allocation =>
    allocation.asset_name?.toLowerCase().includes(term) ||
    allocation.asset_tag?.toLowerCase().includes(term) ||
    allocation.full_name?.toLowerCase().includes(term) ||
    allocation.employee_id?.toLowerCase().includes(term)
  );
};

/**
 * Sort allocations
 */
const sortAllocations = (allocations, sortBy = 'allocated_date', sortOrder = 'asc') => {
  return [...allocations].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    // Handle null/undefined values
    if (aVal === null || aVal === undefined) aVal = '';
    if (bVal === null || bVal === undefined) bVal = '';
    
    // Date comparison
    if (sortBy === 'allocated_date' || sortBy === 'expected_return' || sortBy === 'returned_date' || sortBy === 'created_at') {
      aVal = new Date(aVal).getTime() || 0;
      bVal = new Date(bVal).getTime() || 0;
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    }
    
    // String comparison
    const comparison = String(aVal).localeCompare(String(bVal));
    return sortOrder === 'desc' ? -comparison : comparison;
  });
};

/**
 * Paginate allocations
 */
const paginateAllocations = (allocations, page = 1, limit = 10) => {
  const total = allocations.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedAllocations = allocations.slice(startIndex, endIndex);
  
  return {
    allocations: paginatedAllocations,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

module.exports = {
  canAllocateAsset,
  validateUser,
  createAllocation,
  returnAsset,
  getDashboardCounts,
  filterAllocations,
  searchAllocations,
  sortAllocations,
  paginateAllocations
};
