const Ride = require("./ride.model");

// 1. PUBLISH A RIDE (Driver)
exports.createRide = async (req, res) => {
    try {
        const {
            driverId,
            vehicleId,
            pickupCoords,
            pickupAddress,
            destCoords,
            destAddress,
            travelDateTime,
            totalSeats,
            farePerSeat,
        } = req.body;

        const newRide = await Ride.create({
            driverId,
            vehicleId,
            pickupLocation: {
                type: "Point",
                coordinates: pickupCoords, // e.g., [77.2090, 28.6139]
                address: pickupAddress,
            },
            destination: {
                type: "Point",
                coordinates: destCoords,
                address: destAddress,
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
    } catch (error) {
        res.status(500).json({
            message: "Error publishing ride",
            error: error.message,
        });
    }
};

// 2. SEARCH FOR RIDES (Passenger)
exports.searchRides = async (req, res) => {
    try {
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

        const result = await paginate(
            Ride,
            pageNO,
            limit,
            filter,
            populateOpts,
        );

        res.status(200).json({ results: rides.length, rides });
    } catch (error) {
        res.status(500).json({
            message: "Error searching for rides",
            error: error.message,
        });
    }
};

// 3. GET SINGLE RIDE DETAILS
exports.getRideById = async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id)
            .populate("driverId", "name phone")
            .populate("vehicleId", "vehicleModel registrationNumber");

        if (!ride) return res.status(404).json({ message: "Ride not found" });

        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching ride",
            error: error.message,
        });
    }
};
