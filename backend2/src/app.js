const express = require('express');
const app = express();

//Middleware
app.use(express.json()); 

// Import the user routes
const userRoutes = require('./features/users/user.routes');

// Mount the user routes to a base API path
app.use('/api/users', userRoutes);

module.exports = app;