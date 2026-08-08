const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        rideId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ride",
            required: true,
        },
        passengerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fareDetails: {
            type: Number,
            required: true,
        },
        tripStatus: {
            type: String,
            enum: ["Scheduled", "Ongoing", "Completed", "Cancelled"],
            default: "Scheduled",
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            enum: ["Cash", "Card", "UPI", "Wallet"],
            default: "UPI",
            required: function () {
                return this.paymentStatus === "Completed";
            },
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Trip", tripSchema);
