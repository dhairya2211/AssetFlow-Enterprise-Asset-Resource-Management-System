const express = require('express');
const authRoutes = require('./authRoutes');

const router = express.Router();

/**
 * API v1 Route Group
 * Feature routes mounted here:
 */

// Authentication Routes
router.use('/auth', authRoutes);

/**
 * Future routes will be mounted here:
 *   router.use('/assets', assetRoutes);
 *   router.use('/users', userRoutes);
 *   router.use('/departments', departmentRoutes);
 */

module.exports = router;
