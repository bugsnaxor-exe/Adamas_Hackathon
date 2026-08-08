const express = require("express");
const router = express.Router();

const {
    bookTrip,
    getTripDetails,
    updateTripStatus,
    updatePaymentStatus,
    getUserTrips,
} = require("./trip.controller");

const {
    validateRequest,
    validateQuery,
    validateParams,
} = require("../../middlewares/validateRequest");

const {
    bookTripSchema,
    updatePaymentSchema,
    updateStatusSchema,
    tripQuerySchema,
    idParamSchema,
    userIdParamSchema,
} = require("./trip.validation");

// POST /api/travel/book -> Book a new trip
router.post("/book", validateRequest(bookTripSchema), bookTrip);

// GET /api/travel/user/:userId?role=passenger -> Get trip history for a user
router.get("/my-trips", validateQuery(tripQuerySchema), getUserTrips);

// GET /api/travel/:id -> Get specific trip details
router.get("/:id", validateParams(idParamSchema), getTripDetails);

// PATCH /api/travel/:id/status -> Update ride status (Ongoing, Completed, Cancelled)
router.patch(
    "/:id/status",
    validateParams(idParamSchema),
    validateRequest(updateStatusSchema),
    updateTripStatus,
);

// PATCH /api/travel/:id/payment -> Update payment status (Pending, Completed, Failed)
router.patch(
    "/:id/payment",
    validateParams(idParamSchema),
    validateRequest(updatePaymentSchema),
    updatePaymentStatus,
);

module.exports = router;
