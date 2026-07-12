const MaintenanceRequestModel = require('../models/maintenanceRequestModel');
const AssetModel = require('../models/assetModel');
const UserModel = require('../models/userModel');
const { withTransaction } = require('../config/database');

/**
 * Check if asset can have maintenance request
 * Asset must exist and not already have pending/in_progress maintenance
 */
const canRequestMaintenance = async (assetId) => {
  try {
    const asset = await AssetModel.getById(assetId);
    
    if (!asset) {
      return { canRequest: false, reason: 'Asset not found' };
    }
    
    // Check if asset already has active maintenance request
    const activeRequests = await MaintenanceRequestModel.getByAsset(assetId);
    const hasActiveRequest = activeRequests.some(
      req => req.status === 'pending' || req.status === 'in_progress'
    );
    
    if (hasActiveRequest) {
      return { canRequest: false, reason: 'Asset already has an active maintenance request' };
    }
    
    return { canRequest: true, asset };
  } catch (error) {
    console.error('Error checking maintenance request eligibility:', error);
    return { canRequest: false, reason: 'Failed to check asset status' };
  }
};

/**
 * Create maintenance request and update asset status to maintenance
 */
const createMaintenance = async (maintenanceData) => {
  try {
    const { asset_id, requested_by, issue, priority, assigned_to } = maintenanceData;
    
    // Check if maintenance can be requested
    const assetCheck = await canRequestMaintenance(asset_id);
    if (!assetCheck.canRequest) {
      throw new Error(assetCheck.reason);
    }
    
    // Check if user exists
    const requester = await UserModel.getById(requested_by);
    if (!requester) {
      throw new Error('Requester not found');
    }
    
    // If assigned_to is provided, check if that user exists
    if (assigned_to) {
      const assignee = await UserModel.getById(assigned_to);
      if (!assignee) {
        throw new Error('Assigned technician not found');
      }
    }
    
    // Create maintenance request and update asset status atomically
    const maintenanceId = await withTransaction(async (connection) => {
      const id = await MaintenanceRequestModel.create({
        asset_id,
        requested_by,
        issue,
        priority: priority || 'medium',
        status: assigned_to ? 'in_progress' : 'pending',
        assigned_to: assigned_to || null
      }, connection);

      await AssetModel.updateStatus(asset_id, 'maintenance', connection);
      return id;
    });

    return maintenanceId;
  } catch (error) {
    console.error('Error creating maintenance request:', error);
    throw error;
  }
};

/**
 * Resolve maintenance request and update asset status to available
 */
const resolveMaintenance = async (maintenanceId) => {
  try {
    // Get maintenance request
    const maintenance = await MaintenanceRequestModel.getById(maintenanceId);
    
    if (!maintenance) {
      throw new Error('Maintenance request not found');
    }
    
    if (maintenance.status === 'resolved') {
      throw new Error('Maintenance request is already resolved');
    }
    
    // Resolve maintenance and update asset status atomically
    await withTransaction(async (connection) => {
      await MaintenanceRequestModel.resolve(maintenanceId, connection);
      await AssetModel.updateStatus(maintenance.asset_id, 'available', connection);
    });

    return true;
  } catch (error) {
    console.error('Error resolving maintenance request:', error);
    throw error;
  }
};

/**
 * Filter maintenance requests
 */
const filterMaintenance = (maintenance, filters) => {
  let filtered = [...maintenance];
  
  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(req => req.status === filters.status);
  }
  
  // Filter by priority
  if (filters.priority) {
    filtered = filtered.filter(req => req.priority === filters.priority);
  }
  
  // Filter by technician
  if (filters.technician) {
    filtered = filtered.filter(req => req.assigned_to === parseInt(filters.technician));
  }
  
  return filtered;
};

/**
 * Search maintenance requests
 */
const searchMaintenance = (maintenance, searchTerm) => {
  if (!searchTerm) return maintenance;
  
  const term = searchTerm.toLowerCase();
  return maintenance.filter(req =>
    req.asset_name?.toLowerCase().includes(term) ||
    req.asset_tag?.toLowerCase().includes(term) ||
    req.issue?.toLowerCase().includes(term) ||
    req.requested_by_name?.toLowerCase().includes(term) ||
    req.assigned_to_name?.toLowerCase().includes(term)
  );
};

/**
 * Sort maintenance requests
 */
const sortMaintenance = (maintenance, sortBy = 'created_at', sortOrder = 'desc') => {
  // Priority order for sorting
  const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
  
  return [...maintenance].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    // Handle null/undefined values
    if (aVal === null || aVal === undefined) aVal = '';
    if (bVal === null || bVal === undefined) bVal = '';
    
    // Priority sorting (special case)
    if (sortBy === 'priority') {
      aVal = priorityOrder[aVal] || 0;
      bVal = priorityOrder[bVal] || 0;
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    }
    
    // Date comparison
    if (sortBy === 'created_at' || sortBy === 'resolved_at') {
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
 * Paginate maintenance requests
 */
const paginateMaintenance = (maintenance, page = 1, limit = 10) => {
  const total = maintenance.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedMaintenance = maintenance.slice(startIndex, endIndex);
  
  return {
    maintenance: paginatedMaintenance,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

module.exports = {
  canRequestMaintenance,
  createMaintenance,
  resolveMaintenance,
  filterMaintenance,
  searchMaintenance,
  sortMaintenance,
  paginateMaintenance
};
