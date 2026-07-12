const MaintenanceRequestModel = require('../models/maintenanceRequestModel');
const {
  createMaintenance: createMaintenanceService,
  resolveMaintenance: resolveMaintenanceService,
  filterMaintenance,
  searchMaintenance,
  sortMaintenance,
  paginateMaintenance
} = require('../services/maintenanceService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Get all maintenance requests with search, pagination, sorting, filtering
 * GET /api/v1/maintenance
 */
const getAllMaintenance = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc', status, priority, technician } = req.query;

    let maintenance = await MaintenanceRequestModel.getAll();

    // Apply filters
    maintenance = filterMaintenance(maintenance, { status, priority, technician });

    // Apply search
    if (search) {
      maintenance = searchMaintenance(maintenance, search);
    }

    // Apply sorting
    maintenance = sortMaintenance(maintenance, sortBy, sortOrder);

    // Apply pagination
    const result = paginateMaintenance(maintenance, page, limit);

    return successResponse(res, 'Maintenance requests retrieved successfully', result);
  } catch (error) {
    console.error('Get maintenance requests error:', error);
    return errorResponse(res, 'Failed to retrieve maintenance requests', null, 500);
  }
};

/**
 * Get maintenance request by ID
 * GET /api/v1/maintenance/:id
 */
const getMaintenanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenance = await MaintenanceRequestModel.getById(id);

    if (!maintenance) {
      return errorResponse(res, 'Maintenance request not found', null, 404);
    }

    return successResponse(res, 'Maintenance request retrieved successfully', { maintenance });
  } catch (error) {
    console.error('Get maintenance request error:', error);
    return errorResponse(res, 'Failed to retrieve maintenance request', null, 500);
  }
};

/**
 * Create new maintenance request
 * POST /api/v1/maintenance
 */
const createMaintenance = async (req, res) => {
  try {
    const { asset_id, issue, priority, assigned_to } = req.body;

    const maintenanceId = await createMaintenanceService({
      asset_id,
      requested_by: req.user.id,
      issue,
      priority,
      assigned_to
    });

    const newMaintenance = await MaintenanceRequestModel.getById(maintenanceId);

    return successResponse(res, 'Maintenance request created successfully', { maintenance: newMaintenance }, 201);
  } catch (error) {
    console.error('Create maintenance request error:', error);
    return errorResponse(res, error.message || 'Failed to create maintenance request', null, 400);
  }
};

/**
 * Update maintenance request
 * PUT /api/v1/maintenance/:id
 */
const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const { issue, priority, assigned_to } = req.body;

    // Check if maintenance exists
    const existingMaintenance = await MaintenanceRequestModel.getById(id);
    if (!existingMaintenance) {
      return errorResponse(res, 'Maintenance request not found', null, 404);
    }

    await MaintenanceRequestModel.update(id, { issue, priority, assigned_to });
    const updatedMaintenance = await MaintenanceRequestModel.getById(id);

    return successResponse(res, 'Maintenance request updated successfully', { maintenance: updatedMaintenance });
  } catch (error) {
    console.error('Update maintenance request error:', error);
    return errorResponse(res, 'Failed to update maintenance request', null, 500);
  }
};

/**
 * Assign maintenance request
 * PATCH /api/v1/maintenance/:id/assign
 */
const assignMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;

    // Check if maintenance exists
    const existingMaintenance = await MaintenanceRequestModel.getById(id);
    if (!existingMaintenance) {
      return errorResponse(res, 'Maintenance request not found', null, 404);
    }

    await MaintenanceRequestModel.assign(id, assigned_to);
    const updatedMaintenance = await MaintenanceRequestModel.getById(id);

    return successResponse(res, 'Maintenance request assigned successfully', { maintenance: updatedMaintenance });
  } catch (error) {
    console.error('Assign maintenance request error:', error);
    return errorResponse(res, 'Failed to assign maintenance request', null, 500);
  }
};

/**
 * Resolve maintenance request
 * PATCH /api/v1/maintenance/:id/resolve
 */
const resolveMaintenance = async (req, res) => {
  try {
    const { id } = req.params;

    await resolveMaintenanceService(id);

    const maintenance = await MaintenanceRequestModel.getById(id);

    return successResponse(res, 'Maintenance request resolved successfully', { maintenance });
  } catch (error) {
    console.error('Resolve maintenance request error:', error);
    return errorResponse(res, error.message || 'Failed to resolve maintenance request', null, 400);
  }
};

/**
 * Delete maintenance request
 * DELETE /api/v1/maintenance/:id
 */
const deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if maintenance exists
    const maintenance = await MaintenanceRequestModel.getById(id);
    if (!maintenance) {
      return errorResponse(res, 'Maintenance request not found', null, 404);
    }

    await MaintenanceRequestModel.delete(id);

    return successResponse(res, 'Maintenance request deleted successfully');
  } catch (error) {
    console.error('Delete maintenance request error:', error);
    return errorResponse(res, 'Failed to delete maintenance request', null, 500);
  }
};

/**
 * Get pending maintenance requests
 * GET /api/v1/maintenance/pending
 */
const getPendingMaintenance = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    let maintenance = await MaintenanceRequestModel.getPending();
    
    // Apply pagination
    const result = paginateMaintenance(maintenance, page, limit);

    return successResponse(res, 'Pending maintenance requests retrieved successfully', result);
  } catch (error) {
    console.error('Get pending maintenance requests error:', error);
    return errorResponse(res, 'Failed to retrieve pending maintenance requests', null, 500);
  }
};

/**
 * Get in-progress maintenance requests
 * GET /api/v1/maintenance/in-progress
 */
const getInProgressMaintenance = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    let maintenance = await MaintenanceRequestModel.getByStatus('in_progress');
    
    // Apply pagination
    const result = paginateMaintenance(maintenance, page, limit);

    return successResponse(res, 'In-progress maintenance requests retrieved successfully', result);
  } catch (error) {
    console.error('Get in-progress maintenance requests error:', error);
    return errorResponse(res, 'Failed to retrieve in-progress maintenance requests', null, 500);
  }
};

/**
 * Get resolved maintenance requests
 * GET /api/v1/maintenance/resolved
 */
const getResolvedMaintenance = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    let maintenance = await MaintenanceRequestModel.getByStatus('resolved');
    
    // Apply pagination
    const result = paginateMaintenance(maintenance, page, limit);

    return successResponse(res, 'Resolved maintenance requests retrieved successfully', result);
  } catch (error) {
    console.error('Get resolved maintenance requests error:', error);
    return errorResponse(res, 'Failed to retrieve resolved maintenance requests', null, 500);
  }
};

module.exports = {
  getAllMaintenance,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  assignMaintenance,
  resolveMaintenance,
  deleteMaintenance,
  getPendingMaintenance,
  getInProgressMaintenance,
  getResolvedMaintenance
};
