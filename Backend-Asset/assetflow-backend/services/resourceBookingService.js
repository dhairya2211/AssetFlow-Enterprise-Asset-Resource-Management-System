const ResourceBookingModel = require('../models/resourceBookingModel');
const UserModel = require('../models/userModel');

/**
 * Filter bookings
 */
const filterBookings = (bookings, filters) => {
  let filtered = [...bookings];
  
  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(booking => booking.status === filters.status);
  }
  
  // Filter by resource
  if (filters.resource) {
    filtered = filtered.filter(booking => booking.resource_name === filters.resource);
  }
  
  // Filter by date
  if (filters.date) {
    filtered = filtered.filter(booking => 
      new Date(booking.booking_date).toISOString().split('T')[0] === new Date(filters.date).toISOString().split('T')[0]
    );
  }
  
  return filtered;
};

/**
 * Search bookings
 */
const searchBookings = (bookings, searchTerm) => {
  if (!searchTerm) return bookings;
  
  const term = searchTerm.toLowerCase();
  return bookings.filter(booking =>
    booking.resource_name?.toLowerCase().includes(term) ||
    booking.purpose?.toLowerCase().includes(term) ||
    booking.full_name?.toLowerCase().includes(term)
  );
};

/**
 * Sort bookings
 */
const sortBookings = (bookings, sortBy = 'booking_date', sortOrder = 'asc') => {
  return [...bookings].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    // Handle null/undefined values
    if (aVal === null || aVal === undefined) aVal = '';
    if (bVal === null || bVal === undefined) bVal = '';
    
    // Date/time comparison
    if (sortBy === 'booking_date' || sortBy === 'start_time' || sortBy === 'created_at') {
      aVal = new Date(aVal).getTime() || 0;
      bVal = new Date(bVal).getTime() || 0;
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    }
    
    // String comparison
    const comparison = String(aVal).localeCompare(String(bVal));
    return sortOrder === 'desc' ? -comparison : comparison;
  });
};

/**
 * Paginate bookings
 */
const paginateBookings = (bookings, page = 1, limit = 10) => {
  const total = bookings.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedBookings = bookings.slice(startIndex, endIndex);
  
  return {
    bookings: paginatedBookings,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Create a new booking
 */
const createBooking = async (bookingData) => {
  try {
    const { resource_name, booked_by, booking_date, start_time, end_time, purpose } = bookingData;
    
    // Validate user exists
    const user = await UserModel.getById(booked_by);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if start time is before end time
    if (start_time >= end_time) {
      throw new Error('Start time must be before end time');
    }
    
    // Check resource availability
    const conflicts = await ResourceBookingModel.checkAvailability(
      resource_name, booking_date, start_time, end_time
    );
    
    if (conflicts.length > 0) {
      throw new Error('Resource is not available during this time');
    }
    
    const bookingId = await ResourceBookingModel.create({
      resource_name,
      booked_by,
      booking_date,
      start_time,
      end_time,
      purpose
    });
    
    return bookingId;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Update a booking
 */
const updateBooking = async (bookingId, bookingData, currentUser) => {
  try {
    const { booking_date, start_time, end_time, purpose } = bookingData;
    
    // Get existing booking
    const existingBooking = await ResourceBookingModel.getById(bookingId);
    if (!existingBooking) {
      throw new Error('Booking not found');
    }
    
    // Check if booking is past
    const now = new Date();
    const bookingDate = new Date(existingBooking.booking_date);
    const bookingEndTime = new Date(`${existingBooking.booking_date}T${existingBooking.end_time}`);
    
    if (bookingEndTime < now) {
      throw new Error('Past bookings cannot be edited');
    }
    
    // Check if booking is cancelled
    if (existingBooking.status === 'cancelled') {
      throw new Error('Cancelled bookings cannot be edited');
    }
    
    // Check authorization: only booking owner, manager, or admin can update
    if (existingBooking.booked_by !== currentUser.id && 
        currentUser.role !== 'manager' && 
        currentUser.role !== 'admin') {
      throw new Error('Not authorized to edit this booking');
    }
    
    // Check if start time is before end time if provided
    if (start_time && end_time && start_time >= end_time) {
      throw new Error('Start time must be before end time');
    }
    
    // Check resource availability if time or date changed
    if (booking_date || start_time || end_time) {
      const conflicts = await ResourceBookingModel.checkAvailability(
        existingBooking.resource_name,
        booking_date || existingBooking.booking_date,
        start_time || existingBooking.start_time,
        end_time || existingBooking.end_time
      );
      
      // Exclude the current booking from conflict check
      const otherConflicts = conflicts.filter(conflict => conflict.id !== bookingId);
      
      if (otherConflicts.length > 0) {
        throw new Error('Resource is not available during this time');
      }
    }
    
    await ResourceBookingModel.update(bookingId, {
      booking_date: booking_date || existingBooking.booking_date,
      start_time: start_time || existingBooking.start_time,
      end_time: end_time || existingBooking.end_time,
      purpose: purpose !== undefined ? purpose : existingBooking.purpose
    });
    
    return true;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

/**
 * Get calendar data
 */
const getCalendarData = async (startDate, endDate) => {
  try {
    const bookings = await ResourceBookingModel.getByDateRange(startDate, endDate);
    return bookings;
  } catch (error) {
    console.error('Error getting calendar data:', error);
    throw error;
  }
};

module.exports = {
  filterBookings,
  searchBookings,
  sortBookings,
  paginateBookings,
  createBooking,
  updateBooking,
  getCalendarData
};
