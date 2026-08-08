const express = require('express');
const app = express();

//Middleware
app.use(express.json()); 

// Import the user routes
const userRoutes = require('./features/users/user.routes');
const tripRoutes = require('./features/trips/trip.routes'); 
const rideRoutes = require('./features/rides//ride.routes'); 
const vehicleRoutes = require('./features/vehicles/vehicle.routes'); 
const walletRoutes = require('./features/wallet/wallet.routes')

// Mount the user routes to a base API path
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/rides', vehicleRoutes);
app.use('/api/rides', walletRoutes);

module.exports = app;