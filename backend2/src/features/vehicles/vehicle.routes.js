const express = require("express");
const router = express.Router();

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
router.post("/", validateRequest(createVehicleSchema), addVehicle);

// GET /api/vehicles/user/:userId -> Get all vehicles owned by a user
router.get("/user/:userId", validateParams(userIdParamSchema), getUserVehicles);

// PUT /api/vehicles/:id -> Update a specific vehicle
router.put("/:id", validateParams(idParamSchema), updateVehicle);

// DELETE /api/vehicles/:id -> Remove a vehicle
router.delete("/:id", validateParams(idParamSchema), deleteVehicle);

module.exports = router;
