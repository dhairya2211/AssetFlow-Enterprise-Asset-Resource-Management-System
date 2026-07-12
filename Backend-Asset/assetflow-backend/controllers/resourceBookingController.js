const ResourceBookingModel = require('../models/resourceBookingModel');
const {
  filterBookings,
  searchBookings,
  sortBookings,
  paginateBookings,
  createBooking: createBookingService,
  updateBooking: updateBookingService,
  getCalendarData
} = require('../services/resourceBookingService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * Get all bookings with search, pagination, sorting, filtering
 * GET /api/v1/bookings
 */
const getAllBookings = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = 'booking_date', sortOrder = 'asc', status, resource, date } = req.query;

    let bookings = await ResourceBookingModel.getAll();

    // Apply filters
    bookings = filterBookings(bookings, { status, resource, date });

    // Apply search
    if (search) {
      bookings = searchBookings(bookings, search);
    }

    // Apply sorting
    bookings = sortBookings(bookings, sortBy, sortOrder);

    // Apply pagination
    const result = paginateBookings(bookings, page, limit);

    return successResponse(res, 'Bookings retrieved successfully', result);
  } catch (error) {
    console.error('Get bookings error:', error);
    return errorResponse(res, 'Failed to retrieve bookings', null, 500);
  }
};

/**
 * Get booking by ID
 * GET /api/v1/bookings/:id
 */
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await ResourceBookingModel.getById(id);

    if (!booking) {
      return errorResponse(res, 'Booking not found', null, 404);
    }

    return successResponse(res, 'Booking retrieved successfully', { booking });
  } catch (error) {
    console.error('Get booking error:', error);
    return errorResponse(res, 'Failed to retrieve booking', null, 500);
  }
};

/**
 * Create new booking
 * POST /api/v1/bookings
 */
const createBooking = async (req, res) => {
  try {
    const { resource_name, booking_date, start_time, end_time, purpose } = req.body;
    const booked_by = req.user.id;

    const bookingId = await createBookingService({
      resource_name,
      booked_by,
      booking_date,
      start_time,
      end_time,
      purpose
    });

    const newBooking = await ResourceBookingModel.getById(bookingId);

    return successResponse(res, 'Booking created successfully', { booking: newBooking }, 201);
  } catch (error) {
    console.error('Create booking error:', error);
    return errorResponse(res, error.message || 'Failed to create booking', null, 400);
  }
};

/**
 * Update booking
 * PUT /api/v1/bookings/:id
 */
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { booking_date, start_time, end_time, purpose } = req.body;

    await updateBookingService(id, {
      booking_date,
      start_time,
      end_time,
      purpose
    }, req.user);

    const updatedBooking = await ResourceBookingModel.getById(id);

    return successResponse(res, 'Booking updated successfully', { booking: updatedBooking });
  } catch (error) {
    console.error('Update booking error:', error);
    return errorResponse(res, error.message || 'Failed to update booking', null, 400);
  }
};

/**
 * Delete booking
 * DELETE /api/v1/bookings/:id
 */
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await ResourceBookingModel.getById(id);
    if (!booking) {
      return errorResponse(res, 'Booking not found', null, 404);
    }

    await ResourceBookingModel.delete(id);

    return successResponse(res, 'Booking deleted successfully');
  } catch (error) {
    console.error('Delete booking error:', error);
    return errorResponse(res, 'Failed to delete booking', null, 500);
  }
};

/**
 * Get upcoming bookings
 * GET /api/v1/bookings/upcoming
 */
const getUpcomingBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    let bookings = await ResourceBookingModel.getUpcoming();
    
    // Apply pagination
    const result = paginateBookings(bookings, page, limit);

    return successResponse(res, 'Upcoming bookings retrieved successfully', result);
  } catch (error) {
    console.error('Get upcoming bookings error:', error);
    return errorResponse(res, 'Failed to retrieve upcoming bookings', null, 500);
  }
};

/**
 * Get calendar bookings
 * GET /api/v1/bookings/calendar
 */
const getCalendarBookings = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    if (!start_date || !end_date) {
      return errorResponse(res, 'start_date and end_date are required', null, 400);
    }
    
    const bookings = await getCalendarData(start_date, end_date);

    return successResponse(res, 'Calendar bookings retrieved successfully', { bookings });
  } catch (error) {
    console.error('Get calendar bookings error:', error);
    return errorResponse(res, 'Failed to retrieve calendar bookings', null, 500);
  }
};

/**
 * Get bookings by resource
 * GET /api/v1/bookings/resource/:resourceName
 */
const getBookingsByResource = async (req, res) => {
  try {
    const { resourceName } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    let bookings = await ResourceBookingModel.getByResource(decodeURIComponent(resourceName));
    
    // Apply pagination
    const result = paginateBookings(bookings, page, limit);

    return successResponse(res, 'Bookings retrieved successfully', result);
  } catch (error) {
    console.error('Get bookings by resource error:', error);
    return errorResponse(res, 'Failed to retrieve bookings', null, 500);
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getUpcomingBookings,
  getCalendarBookings,
  getBookingsByResource
};
