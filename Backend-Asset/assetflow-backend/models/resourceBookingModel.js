const { pool } = require('../config/database');

const ResourceBookingModel = {
  /**
   * Get all resource bookings
   */
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT rb.*, 
             u.full_name, u.employee_id
      FROM resource_bookings rb
      JOIN users u ON rb.booked_by = u.id
      ORDER BY rb.booking_date DESC, rb.start_time DESC
    `);
    return rows;
  },

  /**
   * Get booking by ID
   */
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT rb.*, 
             u.full_name, u.employee_id
      FROM resource_bookings rb
      JOIN users u ON rb.booked_by = u.id
      WHERE rb.id = ?
    `, [id]);
    return rows[0];
  },

  /**
   * Get bookings by resource name
   */
  getByResource: async (resourceName) => {
    const [rows] = await pool.query(`
      SELECT rb.*, 
             u.full_name, u.employee_id
      FROM resource_bookings rb
      JOIN users u ON rb.booked_by = u.id
      WHERE rb.resource_name = ?
      ORDER BY rb.booking_date DESC, rb.start_time DESC
    `, [resourceName]);
    return rows;
  },

  /**
   * Get bookings by user
   */
  getByUser: async (userId) => {
    const [rows] = await pool.query(`
      SELECT rb.*, 
             u.full_name, u.employee_id
      FROM resource_bookings rb
      JOIN users u ON rb.booked_by = u.id
      WHERE rb.booked_by = ?
      ORDER BY rb.booking_date DESC, rb.start_time DESC
    `, [userId]);
    return rows;
  },

  /**
   * Get bookings by date range
   */
  getByDateRange: async (startDate, endDate) => {
    const [rows] = await pool.query(`
      SELECT rb.*, 
             u.full_name, u.employee_id
      FROM resource_bookings rb
      JOIN users u ON rb.booked_by = u.id
      WHERE rb.booking_date BETWEEN ? AND ?
      ORDER BY rb.booking_date DESC, rb.start_time DESC
    `, [startDate, endDate]);
    return rows;
  },

  /**
   * Get bookings by status
   */
  getByStatus: async (status) => {
    const [rows] = await pool.query(`
      SELECT rb.*, 
             u.full_name, u.employee_id
      FROM resource_bookings rb
      JOIN users u ON rb.booked_by = u.id
      WHERE rb.status = ?
      ORDER BY rb.booking_date DESC, rb.start_time DESC
    `, [status]);
    return rows;
  },

  /**
   * Get upcoming bookings
   */
  getUpcoming: async () => {
    const [rows] = await pool.query(`
      SELECT rb.*, 
             u.full_name, u.employee_id
      FROM resource_bookings rb
      JOIN users u ON rb.booked_by = u.id
      WHERE rb.booking_date >= CURDATE() AND rb.status IN ('pending', 'confirmed')
      ORDER BY rb.booking_date ASC, rb.start_time ASC
    `);
    return rows;
  },

  /**
   * Check resource availability
   */
  checkAvailability: async (resourceName, bookingDate, startTime, endTime) => {
    const [rows] = await pool.query(`
      SELECT * FROM resource_bookings
      WHERE resource_name = ? 
      AND booking_date = ? 
      AND status IN ('pending', 'confirmed')
      AND ((start_time <= ? AND end_time > ?) OR (start_time < ? AND end_time >= ?) OR (start_time >= ? AND end_time <= ?))
    `, [resourceName, bookingDate, startTime, startTime, endTime, endTime, startTime, endTime]);
    return rows;
  },

  /**
   * Create new booking
   */
  create: async (booking) => {
    const [result] = await pool.query(
      'INSERT INTO resource_bookings (resource_name, booked_by, booking_date, start_time, end_time, purpose, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        booking.resource_name,
        booking.booked_by,
        booking.booking_date,
        booking.start_time,
        booking.end_time,
        booking.purpose || null,
        booking.status || 'pending'
      ]
    );
    return result.insertId;
  },

  /**
   * Update booking
   */
  update: async (id, booking) => {
    const [result] = await pool.query(
      'UPDATE resource_bookings SET booking_date = ?, start_time = ?, end_time = ?, purpose = ? WHERE id = ?',
      [booking.booking_date, booking.start_time, booking.end_time, booking.purpose, id]
    );
    return result.affectedRows;
  },

  /**
   * Update booking status
   */
  updateStatus: async (id, status) => {
    const [result] = await pool.query('UPDATE resource_bookings SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  },

  /**
   * Delete booking
   */
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM resource_bookings WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = ResourceBookingModel;
