const Ride = require("./ride.model");
const catchAsync = require("../../middlewares/errorHandler");

// 1. PUBLISH A RIDE (Driver)
exports.createRide = catchAsync(async (req, res) => {
    const driverId = req.user.id;
    const {
        vehicleId,
        pickupCoords,
        destCoords,
        travelDateTime,
        totalSeats,
        farePerSeat,
    } = req.body;

    const newRide = await Ride.create({
        driverId,
        vehicleId,
        pickupLocation: {
            type: "Point",
            coordinates: [pickupCoords.lng, pickupCoords.lat], // e.g., [77.2090, 28.6139]
            address: pickupCoords.address,
        },
        destination: {
            type: "Point",
            coordinates: [destCoords.lng, destCoords.lat],
            address: destCoords.address,
        },
        travelDateTime,
        totalSeats,
        availableSeats: totalSeats, // Initially, all seats are available
        farePerSeat,
    });

    res.status(201).json({
        message: "Ride published successfully",
        ride: newRide,
    });
});

// 2. SEARCH FOR RIDES (Passenger)
exports.searchRides = catchAsync(async (req, res) => {
    // Expecting query parameters: lng, lat (pickup), and date
    const { lng, lat, date, radiusInKm = 5, pageNo, limit } = req.query;

    // Convert date string to a Date object range (entire day)
    const searchDate = new Date(date);
    const nextDay = new Date(searchDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Find active rides with available seats, matching the date, near the pickup location
    const filter = {
        status: "Active",
        availableSeats: { $gt: 0 },
        travelDateTime: { $gte: searchDate, $lt: nextDay },
        pickupLocation: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)],
                },
                // Convert km to meters for MongoDB $near radius
                $maxDistance: parseInt(radiusInKm) * 1000,
            },
        },
    };

    const populateOpts = [
        { path: "driverId", select: "name phone" },
        {
            path: "vehicleId",
            select: "vehicleModel registrationNumber seatingCapacity -_id",
        },
    ];

    const result = await paginate(Ride, pageNO, limit, filter, populateOpts);

    res.status(200).json({ results });
});

// 3. GET SINGLE RIDE DETAILS
exports.getRideById = catchAsync(async (req, res) => {
    const ride = await Ride.findById(req.params.id)
        .populate("driverId", "name phone")
        .populate("vehicleId", "vehicleModel registrationNumber");

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    res.status(200).json(ride);
});
