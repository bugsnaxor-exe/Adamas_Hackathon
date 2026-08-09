const Trip = require("./trip.model");
const Ride = require("../rides/ride.model");
const catchAsync = require("../../middlewares/errorHandler");
const paginate = require("../../utils/paginationHelper");
// 1. BOOK A TRIP
exports.bookTrip = catchAsync(async (req, res) => {
    const { rideId, paymentMethod } = req.body;
    const passengerId = req.user.id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const ride = await Ride.findOneAndUpdate(
            {
                _id: rideId,
                availableSeats: { $gte: 1 },
                status: "Active",
                driverId: { $ne: passengerId },
            },
            { $inc: { availableSeats: -1 } },
            { new: true, session },
        );

        if (!ride) {
            throw new Error(
                "Ride is fully booked, inactive, or you are the driver.",
            );
        }

        const newTrip = await Trip.create(
            [
                {
                    rideId,
                    passengerId,
                    driverId: ride.driverId,
                    fareDetails: ride.farePerSeat,
                    paymentMethod: paymentMethod || "UPI",
                    tripStatus: "Scheduled",
                    paymentStatus: "Pending",
                },
            ],
            { session },
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "Trip booked successfully",
            trip: newTrip[0],
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error; // Let catchAsync handle it
    }
});

// 2. GET TRIP DETAILS
exports.getTripDetails = catchAsync(async (req, res) => {
    const trip = await Trip.findById(req.params.id)
        .populate("passengerId", "name phone")
        .populate("driverId", "name phone")
        .populate("rideId", "pickupLocation destination travelDateTime");

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.status(200).json(trip);
});

// 3. UPDATE TRIP STATUS (Start, Complete, or Cancel)
exports.updateTripStatus = catchAsync(async (req, res) => {
    const { tripStatus } = req.body; // "Ongoing", "Completed", or "Cancelled"

    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.tripStatus = tripStatus;
    await trip.save();

    // If cancelled, return the seat back to the Ride pool
    if (tripStatus === "Cancelled") {
        const ride = await Ride.findById(trip.rideId);
        if (ride) {
            ride.availableSeats += 1;
            await ride.save();
        }
    }

    res.status(200).json({ message: `Trip marked as ${tripStatus}`, trip });
});

// 4. UPDATE PAYMENT STATUS
exports.updatePaymentStatus = catchAsync(async (req, res) => {
    const { paymentStatus, paymentMethod } = req.body;

    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.paymentStatus = paymentStatus;
    if (paymentMethod) trip.paymentMethod = paymentMethod;

    await trip.save();

    res.status(200).json({ message: "Payment status updated", trip });
});

// 5. GET USER'S TRIP HISTORY (Works for both Passengers and Drivers)
exports.getUserTrips = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { pageNO, limit, role } = req.query; // Pass ?role=passenger or ?role=driver in the URL

    let filter = {};
    if (role === "driver") {
        filter = { driverId: userId };
    } else if (role === "passenger") {
        filter = { passengerId: userId }; // Default to passenger
    } else {
        filter = {
            $or: [{ passengerId: userId }, { driverId: userId }],
        };
    }

    const populateOpts = [
        {
            path: "rideId",
            select: "pickupLocation destination travelDateTime status",
        },
    ];

    const result = await paginate(Trip, pageNO, limit, filter, populateOpts);

    res.status(200).json({ results });
});
