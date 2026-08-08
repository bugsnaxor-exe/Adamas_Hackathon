const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        vehicleModel: { type: String, required: true, trim: true },
        registrationNumber: { type: String, required: true, trim: true },
        seatingCapacity: { type: Number, required: true, min: 1 },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Vehicle", vehicleSchema);

