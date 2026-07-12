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

/**
 * Execute a callback within a MySQL transaction.
 * Commits on success, rolls back on failure.
 * @param {Function} callback - Async function receiving the connection
 * @returns {Promise<*>} Result from callback
 */
const withTransaction = async (callback) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = { pool, testConnection, withTransaction };
