const AuditModel = require('../models/auditModel');
const AuditItemModel = require('../models/auditItemModel');
const {
  createAuditItems: createAuditItemsService,
  canCloseAudit,
  filterAudits,
  searchAudits,
  sortAudits,
  paginateAudits
} = require('../services/auditService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Get all audits with search, pagination, sorting, filtering
 * GET /api/v1/audits
 */
const getAllAudits = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'start_date', sortOrder = 'desc', status, department } = req.query;

    let audits = await AuditModel.getAll();

    // Apply filters
    audits = filterAudits(audits, { status, department });

    // Apply search
    if (search) {
      audits = searchAudits(audits, search);
    }

    // Apply sorting
    audits = sortAudits(audits, sortBy, sortOrder);

    // Apply pagination
    const result = paginateAudits(audits, page, limit);

    return successResponse(res, 'Audits retrieved successfully', result);
  } catch (error) {
    console.error('Get audits error:', error);
    return errorResponse(res, 'Failed to retrieve audits', null, 500);
  }
};

/**
 * Get audit by ID with items
 * GET /api/v1/audits/:id
 */
const getAuditById = async (req, res) => {
  try {
    const { id } = req.params;
    const audit = await AuditModel.getById(id);

    if (!audit) {
      return errorResponse(res, 'Audit not found', null, 404);
    }

    const items = await AuditItemModel.getByAuditId(id);

    return successResponse(res, 'Audit retrieved successfully', { audit, items });
  } catch (error) {
    console.error('Get audit error:', error);
    return errorResponse(res, 'Failed to retrieve audit', null, 500);
  }
};

/**
 * Create new audit
 * POST /api/v1/audits
 */
const createAudit = async (req, res) => {
  try {
    const { audit_name, department_id, auditor, start_date, end_date, status } = req.body;

    const auditId = await AuditModel.create({
      audit_name,
      department_id,
      auditor,
      start_date,
      end_date,
      status
    });

    const newAudit = await AuditModel.getById(auditId);

    return successResponse(res, 'Audit created successfully', { audit: newAudit }, 201);
  } catch (error) {
    console.error('Create audit error:', error);
    return errorResponse(res, error.message || 'Failed to create audit', null, 400);
  }
};

/**
 * Update audit
 * PUT /api/v1/audits/:id
 */
const updateAudit = async (req, res) => {
  try {
    const { id } = req.params;
    const { audit_name, department_id, auditor, start_date, end_date } = req.body;

    // Check if audit exists
    const existingAudit = await AuditModel.getById(id);
    if (!existingAudit) {
      return errorResponse(res, 'Audit not found', null, 404);
    }

    await AuditModel.update(id, { audit_name, department_id, auditor, start_date, end_date });
    const updatedAudit = await AuditModel.getById(id);

    return successResponse(res, 'Audit updated successfully', { audit: updatedAudit });
  } catch (error) {
    console.error('Update audit error:', error);
    return errorResponse(res, 'Failed to update audit', null, 500);
  }
};

/**
 * Delete audit
 * DELETE /api/v1/audits/:id
 */
const deleteAudit = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if audit exists
    const audit = await AuditModel.getById(id);
    if (!audit) {
      return errorResponse(res, 'Audit not found', null, 404);
    }

    await withTransaction(async (connection) => {
      await AuditItemModel.deleteByAuditId(id, connection);
      await AuditModel.delete(id, connection);
    });

    return successResponse(res, 'Audit deleted successfully');
  } catch (error) {
    console.error('Delete audit error:', error);
    return errorResponse(res, 'Failed to delete audit', null, 500);
  }
};

/**
 * Add items to audit
 * POST /api/v1/audits/:id/items
 */
const createAuditItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    // Check if audit exists
    const audit = await AuditModel.getById(id);
    if (!audit) {
      return errorResponse(res, 'Audit not found', null, 404);
    }

    const auditItems = await createAuditItemsService(id, items);

    return successResponse(res, 'Audit items added successfully', { items: auditItems });
  } catch (error) {
    console.error('Create audit items error:', error);
    return errorResponse(res, error.message || 'Failed to add audit items', null, 400);
  }
};

/**
 * Update audit item
 * PUT /api/v1/audits/items/:itemId
 */
const updateAuditItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { verification_status, remarks } = req.body;

    // Check if audit item exists
    const existingItem = await AuditItemModel.getById(itemId);
    if (!existingItem) {
      return errorResponse(res, 'Audit item not found', null, 404);
    }

    await AuditItemModel.update(itemId, { verification_status, remarks });
    const updatedItem = await AuditItemModel.getById(itemId);

    return successResponse(res, 'Audit item updated successfully', { item: updatedItem });
  } catch (error) {
    console.error('Update audit item error:', error);
    return errorResponse(res, 'Failed to update audit item', null, 500);
  }
};

/**
 * Verify audit item
 * PATCH /api/v1/audits/items/:itemId/verify
 */
const verifyAuditItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { verification_status, remarks } = req.body;

    // Check if audit item exists
    const existingItem = await AuditItemModel.getById(itemId);
    if (!existingItem) {
      return errorResponse(res, 'Audit item not found', null, 404);
    }

    await AuditItemModel.update(itemId, { verification_status, remarks });
    const updatedItem = await AuditItemModel.getById(itemId);

    return successResponse(res, 'Audit item verified successfully', { item: updatedItem });
  } catch (error) {
    console.error('Verify audit item error:', error);
    return errorResponse(res, 'Failed to verify audit item', null, 500);
  }
};

/**
 * Close audit
 * PATCH /api/v1/audits/:id/close
 */
const closeAudit = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if audit exists
    const audit = await AuditModel.getById(id);
    if (!audit) {
      return errorResponse(res, 'Audit not found', null, 404);
    }

    if (audit.status === 'closed') {
      return errorResponse(res, 'Audit is already closed', null, 400);
    }

    // Check if all items are verified
    const { canClose, items } = await canCloseAudit(id);
    if (!canClose) {
      const unverifiedCount = items.filter(item => !item.verification_status).length;
      return errorResponse(res, `Cannot close audit: ${unverifiedCount} items need verification`, null, 400);
    }

    await AuditModel.updateStatus(id, 'closed');
    const closedAudit = await AuditModel.getById(id);

    return successResponse(res, 'Audit closed successfully', { audit: closedAudit });
  } catch (error) {
    console.error('Close audit error:', error);
    return errorResponse(res, 'Failed to close audit', null, 500);
  }
};

module.exports = {
  getAllAudits,
  getAuditById,
  createAudit,
  updateAudit,
  deleteAudit,
  createAuditItems,
  updateAuditItem,
  verifyAuditItem,
  closeAudit
};
