/**
 * Health Check Controller.
 * Handles server status and health monitoring endpoints.
 */

/**
 * GET / - Root endpoint
 * Returns a simple message confirming the server is running.
 */
const getRoot = (req, res) => {
  res.status(200).json({
    message: 'AssetFlow Backend Running',
  });
};

/**
 * GET /health - Health check endpoint
 * Returns server and database status.
 */
const getHealth = (req, res) => {
  res.status(200).json({
    status: 'OK',
    database: 'Connected Placeholder',
  });
};

module.exports = { getRoot, getHealth };
