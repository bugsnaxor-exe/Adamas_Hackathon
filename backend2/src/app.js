const express = require("express");
const app = express();

//Middleware
app.use(express.json());

// Import the user routes
const userRoutes = require("./features/users/user.routes");
const rideRoutes = require("./features/rides/ride.routes");

// Mount the user routes to a base API path
app.use("/api/users", userRoutes);
app.use("/api/rides", rideRoutes);

module.exports = app;
