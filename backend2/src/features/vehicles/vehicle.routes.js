const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth");

const {
    addVehicle,
    getUserVehicles,
    updateVehicle,
    deleteVehicle,
} = require("./vehicle.controller");

const {
    validateRequest,
    validateParams,
    validateQuery,
} = require("../../middlewares/validateRequest");

const {
    createVehicleSchema,
    updateVehicleSchema,
    idParamSchema,
    userIdParamSchema,
} = require("./vehicle.validation");

// POST /api/vehicles -> Register a new vehicle
router.post("/", protect, validateRequest(createVehicleSchema), addVehicle);

// GET /api/vehicles/user -> Get all vehicles owned by a user
router.get("/user", protect, getUserVehicles);

// PUT /api/vehicles/:id -> Update a specific vehicle
router.put("/:id", protect, validateParams(idParamSchema), updateVehicle);

// DELETE /api/vehicles/:id -> Remove a vehicle
router.delete("/:id", protect, validateParams(idParamSchema), deleteVehicle);

module.exports = router;
