const express = require('express');
const router = express.Router();
const resourceBookingController = require('../controllers/resourceBookingController');
const { authenticate, authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createBookingValidation,
  updateBookingValidation,
  bookingIdValidation,
  bookingQueryValidation,
  calendarQueryValidation
} = require('../validators/resourceBookingValidator');

/**
 * @route   GET /api/v1/bookings
 * @desc    Get all bookings with search, pagination, sorting, filtering
 * @access  Private (Authenticated)
 */
router.get('/', authenticate, bookingQueryValidation, resourceBookingController.getAllBookings);

/**
 * @route   GET /api/v1/bookings/upcoming
 * @desc    Get upcoming bookings
 * @access  Private (Authenticated)
 */
router.get('/upcoming', authenticate, resourceBookingController.getUpcomingBookings);

/**
 * @route   GET /api/v1/bookings/calendar
 * @desc    Get calendar bookings
 * @access  Private (Authenticated)
 */
router.get('/calendar', authenticate, calendarQueryValidation, resourceBookingController.getCalendarBookings);

/**
 * @route   GET /api/v1/bookings/resource/:resourceName
 * @desc    Get bookings by resource
 * @access  Private (Authenticated)
 */
router.get('/resource/:resourceName', authenticate, resourceBookingController.getBookingsByResource);

/**
 * @route   GET /api/v1/bookings/:id
 * @desc    Get booking by ID
 * @access  Private (Authenticated)
 */
router.get('/:id', authenticate, bookingIdValidation, resourceBookingController.getBookingById);

/**
 * @route   POST /api/v1/bookings
 * @desc    Create new booking
 * @access  Private (Authenticated)
 */
router.post('/', authenticate, createBookingValidation, resourceBookingController.createBooking);

/**
 * @route   PUT /api/v1/bookings/:id
 * @desc    Update booking
 * @access  Private (Booking Owner, Manager, Admin)
 */
router.put('/:id', authenticate, updateBookingValidation, resourceBookingController.updateBooking);

/**
 * @route   DELETE /api/v1/bookings/:id
 * @desc    Delete booking
 * @access  Private (Manager, Admin)
 */
router.delete('/:id', authenticate, authorizeRoles('manager', 'admin'), bookingIdValidation, resourceBookingController.deleteBooking);

module.exports = router;
