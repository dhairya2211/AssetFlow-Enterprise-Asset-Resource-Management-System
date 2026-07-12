const mysql = require('mysql2/promise');

/**
 * MySQL connection pool configuration.
 * Uses mysql2 with promise-based API for async/await support.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

/**
 * Test database connectivity.
 * @returns {Promise<boolean>} True if connection succeeds.
 */
const testConnection = async () => {
  const connection = await pool.getConnection();
  connection.release();
  return true;
};

module.exports = { pool, testConnection };
