const AssetModel = require('../models/assetModel');
const AssetCategoryModel = require('../models/assetCategoryModel');
const DepartmentModel = require('../models/departmentModel');

/**
 * Generate unique asset tag
 * Format: AST-000001, AST-000002, etc.
 */
const generateAssetTag = async () => {
  try {
    const allAssets = await AssetModel.getAll();
    
    // Find the highest numeric part from existing tags
    let maxNumber = 0;
    
    for (const asset of allAssets) {
      if (asset.asset_tag && asset.asset_tag.startsWith('AST-')) {
        const numberPart = parseInt(asset.asset_tag.split('-')[1], 10);
        if (!isNaN(numberPart) && numberPart > maxNumber) {
          maxNumber = numberPart;
        }
      }
    }
    
    // Increment and format with leading zeros
    const nextNumber = maxNumber + 1;
    const assetTag = `AST-${String(nextNumber).padStart(6, '0')}`;
    
    return assetTag;
  } catch (error) {
    console.error('Error generating asset tag:', error);
    throw new Error('Failed to generate asset tag');
  }
};

/**
 * Check if serial number is unique
 */
const isSerialNumberUnique = async (serialNumber, excludeAssetId = null) => {
  try {
    const allAssets = await AssetModel.getAll();
    
    for (const asset of allAssets) {
      if (asset.serial_number && asset.serial_number === serialNumber) {
        if (excludeAssetId && asset.id === parseInt(excludeAssetId)) {
          continue; // Skip the asset being updated
        }
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error checking serial number:', error);
    throw new Error('Failed to check serial number uniqueness');
  }
};

/**
 * Validate department exists
 */
const validateDepartment = async (departmentId) => {
  if (!departmentId) return true; // Optional field
  
  const department = await DepartmentModel.getById(departmentId);
  return !!department;
};

/**
 * Validate category exists
 */
const validateCategory = async (categoryId) => {
  const category = await AssetCategoryModel.getById(categoryId);
  return !!category;
};

/**
 * Get dashboard counts
 */
const getDashboardCounts = async () => {
  try {
    const allAssets = await AssetModel.getAll();
    
    const counts = {
      total: allAssets.length,
      available: 0,
      allocated: 0,
      reserved: 0,
      maintenance: 0,
      lost: 0,
      retired: 0,
      disposed: 0
    };
    
    for (const asset of allAssets) {
      const status = asset.status;
      if (counts.hasOwnProperty(status)) {
        counts[status]++;
      }
    }
    
    return counts;
  } catch (error) {
    console.error('Error getting dashboard counts:', error);
    throw new Error('Failed to get dashboard counts');
  }
};

/**
 * Filter assets based on query parameters
 */
const filterAssets = (assets, filters) => {
  let filtered = [...assets];
  
  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(asset => asset.status === filters.status);
  }
  
  // Filter by department
  if (filters.department_id) {
    filtered = filtered.filter(asset => asset.department_id === parseInt(filters.department_id));
  }
  
  // Filter by category
  if (filters.category_id) {
    filtered = filtered.filter(asset => asset.category_id === parseInt(filters.category_id));
  }
  
  // Filter by condition
  if (filters.condition) {
    filtered = filtered.filter(asset => asset.current_condition === filters.condition);
  }
  
  // Filter by shared
  if (filters.shared !== undefined) {
    const isShared = filters.shared === 'true';
    filtered = filtered.filter(asset => asset.is_shared === isShared);
  }
  
  return filtered;
};

/**
 * Search assets
 */
const searchAssets = (assets, searchTerm) => {
  if (!searchTerm) return assets;
  
  const term = searchTerm.toLowerCase();
  return assets.filter(asset =>
    asset.asset_name.toLowerCase().includes(term) ||
    (asset.asset_tag && asset.asset_tag.toLowerCase().includes(term)) ||
    (asset.serial_number && asset.serial_number.toLowerCase().includes(term)) ||
    (asset.location && asset.location.toLowerCase().includes(term))
  );
};

/**
 * Sort assets
 */
const sortAssets = (assets, sortBy = 'asset_name', sortOrder = 'asc') => {
  return [...assets].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    // Handle null/undefined values
    if (aVal === null || aVal === undefined) aVal = '';
    if (bVal === null || bVal === undefined) bVal = '';
    
    // Numeric comparison for purchase_cost
    if (sortBy === 'purchase_cost') {
      aVal = parseFloat(aVal) || 0;
      bVal = parseFloat(bVal) || 0;
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    }
    
    // Date comparison for purchase_date and created_at
    if (sortBy === 'purchase_date' || sortBy === 'created_at') {
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
 * Paginate assets
 */
const paginateAssets = (assets, page = 1, limit = 10) => {
  const total = assets.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedAssets = assets.slice(startIndex, endIndex);
  
  return {
    assets: paginatedAssets,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

module.exports = {
  generateAssetTag,
  isSerialNumberUnique,
  validateDepartment,
  validateCategory,
  getDashboardCounts,
  filterAssets,
  searchAssets,
  sortAssets,
  paginateAssets
};
