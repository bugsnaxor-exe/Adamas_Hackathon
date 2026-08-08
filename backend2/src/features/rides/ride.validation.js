const Joi = require("joi");

const createRideSchema = Joi.object({
    vehicleId: Joi.string().hex().length(24).required().messages({
        "string.length": "Invalid Vehicle ID format",
    }),
    pickup: Joi.object({
        lat: Joi.number().min(-90).max(90).required(),
        lng: Joi.number().min(-180).max(180).required(),
        address: Joi.string().required(),
    }).required(),
    destination: Joi.object({
        lat: Joi.number().min(-90).max(90).required(),
        lng: Joi.number().min(-180).max(180).required(),
        address: Joi.string().required(),
    }).required(),
    travelDateTime: Joi.date().iso().greater("now").required().messages({
        "date.greater": "Travel time must be in the future",
    }),
    totalSeats: Joi.number().integer().min(1).required(),
    farePerSeat: Joi.number().min(0).required(),
});

// Schema for Searching Rides (GET /api/rides/search)
const searchQuerySchema = Joi.object({
    lat: Joi.number().min(-90).max(90).required().messages({
        "any.required": "Latitude is required to find nearby rides",
    }),
    lng: Joi.number().min(-180).max(180).required().messages({
        "any.required": "Longitude is required to find nearby rides",
    }),
    date: Joi.date().iso().required().messages({
        "any.required": "Travel date is required",
    }),
    // Note: Incorporating the pagination fields so they work seamlessly with our utility
    pageNO: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
});

// Schema for getting a specific ride by ID (GET /api/rides/:id)
const idParamSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        "string.length": "Invalid Ride ID format",
    }),
});

module.exports = {
    createRideSchema,
    searchQuerySchema,
    idParamSchema,
};
