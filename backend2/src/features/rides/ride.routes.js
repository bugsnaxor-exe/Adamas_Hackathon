const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth");

const {
    validateRequest,
    validateQuery,
    validateParams,
} = require("../../middlewares/validateRequest");

const { createRide, searchRides, getRideById } = require("./ride.controller"); // Adjust path if necessary

const {
    createRideSchema,
    searchQuerySchema,
    idParamSchema,
} = require("./ride.validation");

// POST: /api/rides (Publish a new ride)
router.post("/", protect, validateRequest(createRideSchema), createRide);

// GET: /const Joi = require('joi');
// api/rides/search?lng=77.2&lat=28.6&date=2023-12-01 (Find rides)
router.get("/search", protect, validateQuery(searchQuerySchema), searchRides);

// GET: /api/rides/:id (Get details of a specific ride)
router.get("/:id", protect, validateParams(idParamSchema), getRideById);

module.exports = router;
