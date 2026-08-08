const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        transactionType: {
            type: String,
            enum: ["Credit", "Debit"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 1,
        },
        description: {
            type: String,
            required: true,
            trim: true, // e.g., "Wallet Recharge via UPI" or "Payment for Trip #1234"
        },
        tripId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            // Not required, because a wallet recharge isn't tied to a specific trip
        },
        paymentMethod: {
            type: String,
            enum: [
                "Razorpay",
                "Cash",
                "Card",
                "UPI",
                "Internal Wallet Transfer",
            ],
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Transaction", transactionSchema);
