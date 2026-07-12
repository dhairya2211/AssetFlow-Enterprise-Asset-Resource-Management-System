const express = require('express');
const { getRoot, getHealth } = require('../controllers/healthController');

const router = express.Router();

/**
 * Health & Status Routes
 */
router.get('/', getRoot);
router.get('/health', getHealth);

module.exports = router;
