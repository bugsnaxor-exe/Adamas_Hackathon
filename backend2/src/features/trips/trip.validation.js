const Joi = require("joi");

const bookTripSchema = Joi.object({
    rideId: Joi.string().hex().length(24).required().messages({
        "string.length": "Invalid Ride ID format",
    }),
});

const updatePaymentSchema = Joi.object({
    paymentStatus: Joi.string().valid("Pending", "Completed").required(),
    paymentMethod: Joi.string()
        .valid("Cash", "Card", "UPI", "Wallet")
        .when("paymentStatus", {
            is: "Completed",
            then: Joi.required().messages({
                "any.required":
                    "Payment method is required when marking a payment as Completed",
            }),
            otherwise: Joi.forbidden().messages({
                "any.unknown":
                    "Payment method should not be provided if payment is still Pending",
            }),
        }),
});

const updateStatusSchema = Joi.object({
    tripStatus: Joi.string()
        .valid("Booked", "Started", "In Progress", "Completed", "Cancelled")
        .required(),
});

const tripQuerySchema = Joi.object({
    pageNO: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    role: Joi.string().valid("passenger", "driver").optional().messages({
        "any.only": "Role filter must be either passenger or driver",
    }),
});

const idParamSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        "string.length": "Invalid Trip ID format",
    }),
});

const userIdParamSchema = Joi.object({
    userId: Joi.string().hex().length(24).required().messages({
        "string.length": "Invalid User ID format",
    }),
});

module.exports = {
    bookTripSchema,
    updatePaymentSchema,
    updateStatusSchema,
    tripQuerySchema,
    idParamSchema,
    userIdParamSchema,
};
