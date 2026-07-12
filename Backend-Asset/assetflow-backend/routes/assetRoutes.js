const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const assetController = require('../controllers/assetController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createAssetValidation,
  updateAssetValidation,
  updateAssetStatusValidation,
  assetIdValidation,
  assetQueryValidation
} = require('../validators/assetValidator');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads/assets');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'asset-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg, jpeg, png, and webp images are allowed'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter
});

/**
 * @route   GET /api/v1/assets
 * @desc    Get all assets with search, pagination, sorting, filtering
 * @access  Private (Authenticated)
 */
router.get('/', authenticate, assetQueryValidation, assetController.getAllAssets);

/**
 * @route   GET /api/v1/assets/dashboard/counts
 * @desc    Get dashboard counts
 * @access  Private (Authenticated)
 */
router.get('/dashboard/counts', authenticate, assetController.getDashboardCounts);

/**
 * @route   GET /api/v1/assets/available
 * @desc    Get available assets
 * @access  Private (Authenticated)
 */
router.get('/available', authenticate, assetController.getAvailableAssets);

/**
 * @route   GET /api/v1/assets/recent
 * @desc    Get recent assets
 * @access  Private (Authenticated)
 */
router.get('/recent', authenticate, assetController.getRecentAssets);

/**
 * @route   GET /api/v1/assets/search
 * @desc    Search assets
 * @access  Private (Authenticated)
 */
router.get('/search', authenticate, assetController.searchAssetsEndpoint);

/**
 * @route   GET /api/v1/assets/:id
 * @desc    Get asset by ID
 * @access  Private (Authenticated)
 */
router.get('/:id', authenticate, assetIdValidation, assetController.getAssetById);

/**
 * @route   POST /api/v1/assets
 * @desc    Create new asset with optional image upload
 * @access  Private (Admin only)
 */
router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  upload.single('image'),
  createAssetValidation,
  assetController.createAsset
);

/**
 * @route   PUT /api/v1/assets/:id
 * @desc    Update asset with optional image upload
 * @access  Private (Admin only)
 */
router.put(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  upload.single('image'),
  updateAssetValidation,
  assetController.updateAsset
);

/**
 * @route   PATCH /api/v1/assets/:id/status
 * @desc    Update asset status
 * @access  Private (Admin only)
 */
router.patch('/:id/status', authenticate, authorizeRoles('admin'), updateAssetStatusValidation, assetController.updateAssetStatus);

/**
 * @route   DELETE /api/v1/assets/:id
 * @desc    Delete asset (checks for active allocations)
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorizeRoles('admin'), assetIdValidation, assetController.deleteAsset);

module.exports = router;
