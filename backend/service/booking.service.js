import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Booking } from '../models/booking.models.js';

/**
 * Fetches bookings for a given date.
 */
export const getBookingsByDateService = async (dateString) => {
  const date = parseISO(dateString);
  const bookings = await Booking.find({
    startTime: {
      $gte: startOfDay(date),
      $lt: endOfDay(date),
    },
  }).sort({ startTime: 'asc' });

  return bookings;
};

/**
 * Creates a new booking after checking for conflicts.
 */
export const createBookingService = async (bookingData) => {
  const { name, title, room, date, startTime, endTime, description } =
    bookingData;

  if (!name || !title || !room || !date || !startTime || !endTime) {
    const error = new Error('Missing required fields');
    error.statusCode = 400;
    throw error;
  }

  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  if (startDateTime >= endDateTime) {
    const error = new Error('End time must be after start time');
    error.statusCode = 400;
    throw error;
  }

  // The conflict check uses the room name string
  const conflictingBooking = await Booking.findOne({
    room: room, 
    startTime: { $lt: endDateTime },
    endTime: { $gt: startDateTime },
  });

  if (conflictingBooking) {
    const error = new Error('Time slot is already booked for this room.');
    error.statusCode = 409;
    throw error.message;
  }

  // Create the new booking
  const newBooking = await Booking.create({
    name,
    title,
    description,
    startTime: startDateTime,
    endTime: endDateTime,
    room,
  });

  return newBooking;
};


export const delBooking = async(_id)=>{
  if(!_id){
    const error = new Error('Id not found for deleting the booking in service');
    error.statusCode = 409;
    throw error.message;
  }
  const del = await Booking.deleteOne({_id});
  
  return del;
}