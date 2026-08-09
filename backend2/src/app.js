const express = require("express");
const cors = require("cors"); // 1. Import cors
const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
); // 2. Enable CORS for all routes BEFORE your other middleware
app.use(express.json());

// Import the user routes
const userRoutes = require("./features/users/user.routes");
const tripRoutes = require("./features/trips/trip.routes");
const rideRoutes = require("./features/rides/ride.routes");
const vehicleRoutes = require("./features/vehicles/vehicle.routes");
const walletRoutes = require("./features/wallet/wallet.routes");

// Mount the user routes to a base API path
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/wallet", walletRoutes);

module.exports = app;
