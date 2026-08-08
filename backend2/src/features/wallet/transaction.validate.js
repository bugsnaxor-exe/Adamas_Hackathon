const Joi = require("joi");

const rechargeWalletSchema = Joi.object({
    amount: Joi.number().integer().min(1).required().messages({
        "number.base": "Recharge amount must be a number",
        "number.min": "Recharge amount must be at least 1",
        "any.required": "Amount is required",
    }),
    paymentMethod: Joi.string()
        .valid("Razorpay", "UPI", "Card")
        .required()
        .messages({
            "any.only": "Invalid payment gateway",
            "any.required": "Payment method is required",
        }),
    // When integrating Razorpay Test Mode, you receive a gateway transaction ID
    gatewayTransactionId: Joi.string().required().messages({
        "any.required": "Gateway transaction ID is required for verification",
    }),
});

const payForTripSchema = Joi.object({
    tripId: Joi.string().hex().length(24).required().messages({
        "string.length": "Invalid Trip ID format",
        "any.required": "Trip ID is required to process payment",
    }),
    // Note: We do NOT accept the 'amount' from the frontend here.
    // The backend controller MUST query the Trip database to find the agreed-upon fare.
    // Accepting payment amounts from the client is a critical security vulnerability.
});

// Pagination for the transaction ledger
const historyQuerySchema = Joi.object({
    pageNO: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    // Optional filter to view only cash flowing in (Credit) or out (Debit)
    type: Joi.string().valid("Credit", "Debit").optional(),
});

module.exports = {
    rechargeWalletSchema,
    payForTripSchema,
    historyQuerySchema,
};
