const express = require('express');
const router = express.Router();

const { 
  bookTrip, 
  getTripDetails, 
  updateTripStatus, 
  updatePaymentStatus, 
  getUserTrips 
} = require('./trip.controller');

// POST /api/travel/book -> Book a new trip
router.post('/book', bookTrip);

// GET /api/travel/user/:userId?role=passenger -> Get trip history for a user
router.get('/user/:userId', getUserTrips);

// GET /api/travel/:id -> Get specific trip details
router.get('/:id', getTripDetails);

// PATCH /api/travel/:id/status -> Update ride status (Ongoing, Completed, Cancelled)
router.patch('/:id/status', updateTripStatus);

// PATCH /api/travel/:id/payment -> Update payment status (Pending, Completed, Failed)
router.patch('/:id/payment', updatePaymentStatus);

module.exports = router;