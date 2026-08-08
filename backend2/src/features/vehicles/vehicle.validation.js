const Joi = require("joi");

const createVehicleSchema = Joi.object({
    vehicleModel: Joi.string().trim().min(2).required(),
    registrationNumber: Joi.string().trim().min(4).alphanum().required(),
    seatingCapacity: Joi.number().integer().min(1).required(),
});

const updateVehicleSchema = Joi.object({
    vehicleModel: Joi.string().trim().min(2),
    registrationNumber: Joi.string().trim().min(4).alphanum(),
    seatingCapacity: Joi.number().integer().min(1),
}).min(1);

// Validate generic MongoDB ObjectIds in the URL params (for /:id)
const idParamSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        "string.length": "Invalid Vehicle ID format",
    }),
});

// Validate the userId parameter (for /user/:userId)
const userIdParamSchema = Joi.object({
    userId: Joi.string().hex().length(24).required().messages({
        "string.length": "Invalid User ID format",
    }),
});

module.exports = {
    createVehicleSchema,
    updateVehicleSchema,
    idParamSchema,
    userIdParamSchema,
};
