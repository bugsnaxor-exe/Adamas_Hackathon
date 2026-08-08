const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
    {
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        pickupLocation: {
            type: { type: String, enum: ["Point"], required: true },
            coordinates: { type: [Number], required: true },
            address: { type: String, required: true },
        },
        destinationLocation: {
            type: { type: String, enum: ["Point"], required: true },
            coordinates: { type: [Number], required: true },
            address: { type: String, required: true },
        },
        travelDate: { type: Date, required: true },
        totalSeats: { type: Number, required: true, min: 1 },
        availableSeats: { type: Number, required: true },
        farePerSeat: { type: Number, required: true, min: 0 },
        status: {
            type: String,
            enum: ["Scheduled", "Ongoing", "Completed", "Cancelled"],
            default: "Scheduled",
        },
    },
    { timestamps: true },
    { $inc: { availableSeats: -1 } },
);

module.exports = mongoose.model("Ride", rideSchema);
