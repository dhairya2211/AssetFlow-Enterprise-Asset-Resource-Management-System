const AuditModel = require('../models/auditModel');
const AuditItemModel = require('../models/auditItemModel');
const AssetModel = require('../models/assetModel');
const UserModel = require('../models/userModel');
const DepartmentModel = require('../models/departmentModel');
const { withTransaction } = require('../config/database');

/**
 * Check if audit can be closed (all items must be verified)
 */
const canCloseAudit = async (auditId) => {
  const items = await AuditItemModel.getByAuditId(auditId);
  const allVerified = items.every(item => item.verification_status !== null);
  return { canClose: allVerified, items };
};

/**
 * Create audit items in bulk
 */
const createAuditItems = async (auditId, items) => {
  // Validate all assets exist
  for (const item of items) {
    const asset = await AssetModel.getById(item.asset_id);
    if (!asset) {
      throw new Error(`Asset with ID ${item.asset_id} not found`);
    }
  }

  const auditItems = items.map(item => ({
    audit_id: auditId,
    asset_id: item.asset_id,
    verification_status: item.verification_status || null,
    remarks: item.remarks || null
  }));

  await AuditItemModel.createBulk(auditItems);
  return await AuditItemModel.getByAuditId(auditId);
};

/**
 * Filter audits
 */
const filterAudits = (audits, filters) => {
  let filtered = [...audits];
  
  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(audit => audit.status === filters.status);
  }
  
  // Filter by department
  if (filters.department) {
    filtered = filtered.filter(audit => audit.department_id === parseInt(filters.department));
  }
  
  return filtered;
};

/**
 * Search audits
 */
const searchAudits = (audits, searchTerm) => {
  if (!searchTerm) return audits;
  
  const term = searchTerm.toLowerCase();
  return audits.filter(audit =>
    audit.audit_name?.toLowerCase().includes(term) ||
    audit.department_name?.toLowerCase().includes(term)
  );
};

/**
 * Sort audits
 */
const sortAudits = (audits, sortBy = 'start_date', sortOrder = 'desc') => {
  return [...audits].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    // Handle null/undefined values
    if (aVal === null || aVal === undefined) aVal = '';
    if (bVal === null || bVal === undefined) bVal = '';
    
    // Date comparison
    if (sortBy === 'start_date' || sortBy === 'end_date' || sortBy === 'created_at' || sortBy === 'audit_date') {
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
 * Paginate audits
 */
const paginateAudits = (audits, page = 1, limit = 10) => {
  const total = audits.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedAudits = audits.slice(startIndex, endIndex);
  
  return {
    audits: paginatedAudits,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

module.exports = {
  canCloseAudit,
  createAuditItems,
  filterAudits,
  searchAudits,
  sortAudits,
  paginateAudits
};
