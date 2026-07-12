const express = require('express');
const authRoutes = require('./authRoutes');
const departmentRoutes = require('./departmentRoutes');
const assetCategoryRoutes = require('./assetCategoryRoutes');
const userRoutes = require('./userRoutes');
const assetRoutes = require('./assetRoutes');
const assetAllocationRoutes = require('./assetAllocationRoutes');
const transferRoutes = require('./transferRoutes');
const resourceBookingRoutes = require('./resourceBookingRoutes');

const router = express.Router();

// ============================================
// API Root Welcome Route
// ============================================
router.get('/', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Welcome to the AssetFlow API v1"
    });
});

/**
 * API v1 Route Group
 * Feature routes mounted here:
 */

// Authentication Routes
router.use('/auth', authRoutes);

// Master Data Routes
router.use('/departments', departmentRoutes);
router.use('/categories', assetCategoryRoutes);
router.use('/users', userRoutes);

// Asset Management Routes
router.use('/assets', assetRoutes);

// Allocation & Transfer Routes
router.use('/allocations', assetAllocationRoutes);
router.use('/transfers', transferRoutes);

// Resource Booking Routes
router.use('/bookings', resourceBookingRoutes);

/**
 * Future routes will be mounted here:
 *   router.use('/maintenance', maintenanceRoutes);
 *   router.use('/audits', auditRoutes);
 */

module.exports = router;
