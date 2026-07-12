const AssetModel = require('../models/assetModel');
const UserModel = require('../models/userModel');
const AssetAllocationModel = require('../models/assetAllocationModel');
const TransferRequestModel = require('../models/transferRequestModel');
const { withTransaction } = require('../config/database');

/**
 * Check if asset can be transferred
 * Asset must be allocated
 */
const canTransferAsset = async (assetId) => {
  try {
    const asset = await AssetModel.getById(assetId);
    
    if (!asset) {
      return { canTransfer: false, reason: 'Asset not found' };
    }
    
    // Check asset status - only allocated assets can be transferred
    if (asset.status !== 'allocated') {
      return { canTransfer: false, reason: `Asset is ${asset.status}. Only allocated assets can be transferred` };
    }
    
    // Check if asset has active allocation
    const activeAllocations = await AssetAllocationModel.getByAsset(assetId);
    const activeAllocation = activeAllocations.find(a => a.status === 'active');
    
    if (!activeAllocation) {
      return { canTransfer: false, reason: 'Asset has no active allocation' };
    }
    
    return { canTransfer: true, asset, activeAllocation };
  } catch (error) {
    console.error('Error checking asset transfer eligibility:', error);
    return { canTransfer: false, reason: 'Failed to check asset status' };
  }
};

/**
 * Validate users exist
 */
const validateUsers = async (fromUserId, toUserId) => {
  try {
    const fromUser = await UserModel.getById(fromUserId);
    const toUser = await UserModel.getById(toUserId);
    
    if (!fromUser) {
      return { valid: false, reason: 'From user not found' };
    }
    
    if (!toUser) {
      return { valid: false, reason: 'To user not found' };
    }
    
    if (fromUserId === toUserId) {
      return { valid: false, reason: 'Cannot transfer to yourself' };
    }
    
    return { valid: true, fromUser, toUser };
  } catch (error) {
    console.error('Error validating users:', error);
    return { valid: false, reason: 'Failed to validate users' };
  }
};

/**
 * Create transfer request
 */
const createTransferRequest = async (transferData) => {
  try {
    const { asset_id, from_user, to_user, reason } = transferData;
    
    // Check if asset can be transferred
    const assetCheck = await canTransferAsset(asset_id);
    if (!assetCheck.canTransfer) {
      throw new Error(assetCheck.reason);
    }
    
    // Validate users
    const userCheck = await validateUsers(from_user, to_user);
    if (!userCheck.valid) {
      throw new Error(userCheck.reason);
    }
    
    // Validate sender is the current allocation owner
    if (assetCheck.activeAllocation.user_id !== parseInt(from_user, 10)) {
      throw new Error('From user must be the current allocation owner');
    }

    // Check if there's already a pending transfer for this asset
    const existingTransfers = await TransferRequestModel.getByAsset(asset_id);
    const pendingTransfer = existingTransfers.find(t => t.status === 'pending');
    
    if (pendingTransfer) {
      throw new Error('Asset already has a pending transfer request');
    }
    
    // Create transfer request
    const transferId = await TransferRequestModel.create({
      asset_id,
      from_user,
      to_user,
      reason: reason || null,
      status: 'pending'
    });
    
    return transferId;
  } catch (error) {
    console.error('Error creating transfer request:', error);
    throw error;
  }
};

/**
 * Approve transfer request
 * Updates allocation owner and marks transfer as approved
 */
const approveTransfer = async (transferId, approvedBy) => {
  try {
    const transfer = await TransferRequestModel.getById(transferId);

    if (!transfer) {
      throw new Error('Transfer request not found');
    }

    if (transfer.status !== 'pending') {
      throw new Error('Transfer request is not pending');
    }

    const allocations = await AssetAllocationModel.getByAsset(transfer.asset_id);
    const activeAllocation = allocations.find((a) => a.status === 'active');

    if (!activeAllocation) {
      throw new Error('No active allocation found for this asset');
    }

    if (activeAllocation.user_id !== transfer.from_user) {
      throw new Error('Transfer sender is not the current allocation owner');
    }

    await withTransaction(async (connection) => {
      await AssetAllocationModel.updateOwner(activeAllocation.id, transfer.to_user, connection);
      await TransferRequestModel.approve(transferId, approvedBy, connection);
    });

    return true;
  } catch (error) {
    console.error('Error approving transfer:', error);
    throw error;
  }
};

/**
 * Reject transfer request
 */
const rejectTransfer = async (transferId, approvedBy) => {
  try {
    // Get transfer request
    const transfer = await TransferRequestModel.getById(transferId);
    
    if (!transfer) {
      throw new Error('Transfer request not found');
    }
    
    if (transfer.status !== 'pending') {
      throw new Error('Transfer request is not pending');
    }
    
    // Update transfer status
    await TransferRequestModel.reject(transferId, approvedBy);
    
    return true;
  } catch (error) {
    console.error('Error rejecting transfer:', error);
    throw error;
  }
};

/**
 * Filter transfers
 */
const filterTransfers = (transfers, filters) => {
  let filtered = [...transfers];
  
  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(transfer => transfer.status === filters.status);
  }
  
  // Filter by from_user
  if (filters.from_user) {
    filtered = filtered.filter(transfer => transfer.from_user === parseInt(filters.from_user));
  }
  
  // Filter by to_user
  if (filters.to_user) {
    filtered = filtered.filter(transfer => transfer.to_user === parseInt(filters.to_user));
  }
  
  // Filter by asset
  if (filters.asset) {
    filtered = filtered.filter(transfer => transfer.asset_id === parseInt(filters.asset));
  }
  
  return filtered;
};

/**
 * Search transfers
 */
const searchTransfers = (transfers, searchTerm) => {
  if (!searchTerm) return transfers;
  
  const term = searchTerm.toLowerCase();
  return transfers.filter(transfer =>
    transfer.asset_name?.toLowerCase().includes(term) ||
    transfer.asset_tag?.toLowerCase().includes(term) ||
    transfer.from_user_name?.toLowerCase().includes(term) ||
    transfer.from_employee_id?.toLowerCase().includes(term) ||
    transfer.to_user_name?.toLowerCase().includes(term) ||
    transfer.to_employee_id?.toLowerCase().includes(term)
  );
};

/**
 * Sort transfers
 */
const sortTransfers = (transfers, sortBy = 'created_at', sortOrder = 'asc') => {
  return [...transfers].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    // Handle null/undefined values
    if (aVal === null || aVal === undefined) aVal = '';
    if (bVal === null || bVal === undefined) bVal = '';
    
    // Date comparison
    if (sortBy === 'created_at' || sortBy === 'approved_at') {
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
 * Paginate transfers
 */
const paginateTransfers = (transfers, page = 1, limit = 10) => {
  const total = transfers.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedTransfers = transfers.slice(startIndex, endIndex);
  
  return {
    transfers: paginatedTransfers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

module.exports = {
  canTransferAsset,
  validateUsers,
  createTransferRequest,
  approveTransfer,
  rejectTransfer,
  filterTransfers,
  searchTransfers,
  sortTransfers,
  paginateTransfers
};
