import express from 'express';
import {
  createBooking,
  getBookingsByDate,
} from '../controllers/booking.controller.js';

const router = express.Router();

router.route('/').get(getBookingsByDate).post(createBooking);

export default router;