const express = require('express');
const router = express.Router();

const { 
  addVehicle, 
  getUserVehicles, 
  updateVehicle, 
  deleteVehicle 
} = require('./vehicle.controller');

// POST /api/vehicles -> Register a new vehicle
router.post('/', addVehicle);

// GET /api/vehicles/user/:userId -> Get all vehicles owned by a user
router.get('/user/:userId', getUserVehicles);

// PUT /api/vehicles/:id -> Update a specific vehicle
router.put('/:id', updateVehicle);

// DELETE /api/vehicles/:id -> Remove a vehicle
router.delete('/:id', deleteVehicle);

module.exports = router;