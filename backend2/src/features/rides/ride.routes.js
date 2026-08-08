const express = require('express');
const router = express.Router();

const { 
  createRide, 
  searchRides, 
  getRideById 
} = require('./ride.controller'); // Adjust path if necessary

// POST: /api/rides (Publish a new ride)
router.post('/', createRide);

// GET: /api/rides/search?lng=77.2&lat=28.6&date=2023-12-01 (Find rides)
router.get('/search', searchRides);

// GET: /api/rides/:id (Get details of a specific ride)
router.get('/:id', getRideById);

module.exports = router;