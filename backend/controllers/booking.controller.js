import asyncHandler from 'express-async-handler';
import {
  createBookingService,
  getBookingsByDateService,
} from '../service/booking.service.js';


export const createBooking = asyncHandler(async (req, res) => {
  const bookingData = req.body;
  const newBooking = await createBookingService(bookingData);
  res.status(201).json(newBooking);
});


export const getBookingsByDate = asyncHandler(async (req, res) => {
  const { date } = req.query;
  if (!date) {
    res.status(400);
    throw new Error('Date query parameter is required');
  }
  const bookings = await getBookingsByDateService(date);
  res.status(200).json(bookings);
});