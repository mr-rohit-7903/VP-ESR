import express from 'express';
import {
  createBooking,
  deleteBooking,
  getBookingsByDate,
} from '../controllers/booking.controller.js';

const router = express.Router();

router.route('/').get(getBookingsByDate).post(createBooking).delete(deleteBooking);

export default router;