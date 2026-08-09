const Vehicle = require("./vehicle.model"); // Adjust path if needed
const catchAsync = require("../../middlewares/errorHandler");
const paginate = require("../../utils/paginationHelper");

// 1. ADD A NEW VEHICLE
exports.addVehicle = catchAsync(async (req, res) => {
    const ownerId = req.user.id;
    const { vehicleModel, registrationNumber, seatingCapacity } = req.body;

    // Optional: Check if a vehicle with this registration number already exists
    const existingVehicle = await Vehicle.findOne({ registrationNumber });
    if (existingVehicle) {
        return res.status(400).json({
            message: "A vehicle with this registration number already exists.",
        });
    }

    const newVehicle = await Vehicle.create({
        ownerId,
        vehicleModel,
        registrationNumber,
        seatingCapacity,
    });

    res.status(201).json({
        message: "Vehicle added successfully",
        vehicle: newVehicle,
    });
});

// 2. GET ALL VEHICLES FOR A SPECIFIC USER
// (Drivers need this to select which car they are using before publishing a ride)
exports.getUserVehicles = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { pageNo, limit } = req.query;

    const results = await paginate(
        Vehicle,
        pageNo,
        limit,
        {
            ownerId: userId,
        },
        "",
    );

    res.status(200).json(results);
});

// 3. UPDATE VEHICLE DETAILS
exports.updateVehicle = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updates, {
        new: true, // Returns the updated document
        runValidators: true, // Ensures minimum seating capacity is still respected
    });

    if (!updatedVehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({
        message: "Vehicle updated",
        vehicle: updatedVehicle,
    });
});

// 4. DELETE A VEHICLE
exports.deleteVehicle = catchAsync(async (req, res) => {
    const { id } = req.params;

    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle removed successfully" });
});
