const TransferRequestModel = require('../models/transferRequestModel');
const {
  createTransferRequest,
  approveTransfer,
  rejectTransfer,
  filterTransfers,
  searchTransfers,
  sortTransfers,
  paginateTransfers
} = require('../services/transferService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Get all transfer requests with search, pagination, sorting, and filtering
 * GET /api/v1/transfers
 */
const getAllTransfers = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'asc', status, from_user, to_user, asset } = req.query;

    let transfers = await TransferRequestModel.getAll();

    // Apply filters
    transfers = filterTransfers(transfers, { status, from_user, to_user, asset });

    // Apply search
    if (search) {
      transfers = searchTransfers(transfers, search);
    }

    // Apply sorting
    transfers = sortTransfers(transfers, sortBy, sortOrder);

    // Apply pagination
    const result = paginateTransfers(transfers, page, limit);

    return successResponse(res, 'Transfer requests retrieved successfully', result);
  } catch (error) {
    console.error('Get transfers error:', error);
    return errorResponse(res, 'Failed to retrieve transfer requests', null, 500);
  }
};

/**
 * Get transfer request by ID
 * GET /api/v1/transfers/:id
 */
const getTransferById = async (req, res) => {
  try {
    const { id } = req.params;
    const transfer = await TransferRequestModel.getById(id);

    if (!transfer) {
      return errorResponse(res, 'Transfer request not found', null, 404);
    }

    return successResponse(res, 'Transfer request retrieved successfully', { transfer });
  } catch (error) {
    console.error('Get transfer error:', error);
    return errorResponse(res, 'Failed to retrieve transfer request', null, 500);
  }
};

/**
 * Create new transfer request
 * POST /api/v1/transfers
 */
const createTransfer = async (req, res) => {
  try {
    const { asset_id, from_user, to_user, reason } = req.body;

    const transferId = await createTransferRequest({
      asset_id,
      from_user,
      to_user,
      reason
    });

    const newTransfer = await TransferRequestModel.getById(transferId);

    return successResponse(res, 'Transfer request created successfully', { transfer: newTransfer }, 201);
  } catch (error) {
    console.error('Create transfer error:', error);
    return errorResponse(res, error.message || 'Failed to create transfer request', null, 400);
  }
};

/**
 * Approve transfer request
 * PATCH /api/v1/transfers/:id/approve
 */
const approveTransferRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const approvedBy = req.user.id;

    await approveTransfer(id, approvedBy);

    const transfer = await TransferRequestModel.getById(id);

    return successResponse(res, 'Transfer request approved successfully', { transfer });
  } catch (error) {
    console.error('Approve transfer error:', error);
    return errorResponse(res, error.message || 'Failed to approve transfer request', null, 400);
  }
};

/**
 * Reject transfer request
 * PATCH /api/v1/transfers/:id/reject
 */
const rejectTransferRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const approvedBy = req.user.id;

    await rejectTransfer(id, approvedBy);

    const transfer = await TransferRequestModel.getById(id);

    return successResponse(res, 'Transfer request rejected successfully', { transfer });
  } catch (error) {
    console.error('Reject transfer error:', error);
    return errorResponse(res, error.message || 'Failed to reject transfer request', null, 400);
  }
};

/**
 * Get pending transfer requests
 * GET /api/v1/transfers/pending
 */
const getPendingTransfers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    let transfers = await TransferRequestModel.getPending();
    
    // Apply pagination
    const result = paginateTransfers(transfers, page, limit);

    return successResponse(res, 'Pending transfer requests retrieved successfully', result);
  } catch (error) {
    console.error('Get pending transfers error:', error);
    return errorResponse(res, 'Failed to retrieve pending transfer requests', null, 500);
  }
};

module.exports = {
  getAllTransfers,
  getTransferById,
  createTransfer,
  approveTransferRequest,
  rejectTransferRequest,
  getPendingTransfers
};
