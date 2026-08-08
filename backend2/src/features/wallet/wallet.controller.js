const mongoose = require("mongoose");
const Transaction = require("./transaction.model");
const User = require("../users/user.model");
const Trip = require("../trips/trip.model");
const catchAsync = require("../../utils/catchAsync");
const paginate = require("../../utils/paginationHelper");

// 1. GET WALLET BALANCE & RECENT TRANSACTIONS
exports.getWalletDetails = catchAsync(async (req, res) => {
    // Securely extract ID from JWT
    const userId = req.user.id;

    const { pageNO, limit, type } = req.query;

    const user = await User.findById(userId).select("walletBalance");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const filter = { userId };
    if (type) {
        filter.transactionType = type;
    }

    const populateOpts = [
        { path: "tripId", select: "pickupLocation destination status -_id" },
    ];

    const sortOpts = { createdAt: -1 };

    const result = await paginate(
        Transaction,
        pageNO,
        limit,
        filter,
        populateOpts,
        sortOpts,
    );

    res.status(200).json({ balance: user.walletBalance, ledger: result });
});

// 2. RECHARGE WALLET (Add Funds)
exports.rechargeWallet = catchAsync(async (req, res) => {
    // Secure extraction: No user can recharge someone else's wallet maliciously
    const userId = req.user.id;
    const { amount, paymentMethod, gatewayTransactionId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 1. Update User's balance
    user.walletBalance += Number(amount);
    await user.save();

    // 2. Create Transaction Ledger Entry
    const transaction = await Transaction.create({
        userId,
        transactionType: "Credit",
        amount: Number(amount),
        description: `Wallet Recharge via ${paymentMethod}`,
        paymentMethod,
        gatewayTransactionId,
    });

    res.status(200).json({
        message: "Wallet recharged successfully",
        newBalance: user.walletBalance,
        transaction,
    });
});

// 3. PAY FOR TRIP USING WALLET (Atomic Transaction)
exports.payForTrip = catchAsync(async (req, res) => {
    const passengerId = req.user.id;
    // We strictly ONLY accept the tripId from the client
    const { tripId } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Verify ownership and status
    if (trip.passengerId.toString() !== passengerId) {
        return res
            .status(403)
            .json({ message: "You are not authorized to pay for this trip" });
    }
    if (trip.paymentStatus === "Completed") {
        return res.status(400).json({ message: "Trip is already paid for" });
    }

    // CRITICAL: Extract the actual fare from the database, NOT the client
    const actualFare = Number(trip.fareDetails);

    // Initialize a MongoDB Transaction (Session) for absolute financial safety
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const passenger = await User.findById(passengerId).session(session);
        const driver = await User.findById(trip.driverId).session(session);

        if (passenger.walletBalance < actualFare) {
            throw new Error("Insufficient wallet balance. Please recharge.");
        }

        // 1. Deduct from Passenger
        passenger.walletBalance -= actualFare;
        await passenger.save({ session });

        // 2. Add to Driver
        driver.walletBalance += actualFare;
        await driver.save({ session });

        // 3. Create both Ledger Entries (Note: array syntax is required when passing session to create)
        await Transaction.create(
            [
                {
                    userId: passenger._id,
                    transactionType: "Debit",
                    amount: actualFare,
                    description: "Payment for Trip",
                    tripId: trip._id,
                    paymentMethod: "Internal Wallet Transfer",
                },
                {
                    userId: driver._id,
                    transactionType: "Credit",
                    amount: actualFare,
                    description: "Earnings from Trip",
                    tripId: trip._id,
                    paymentMethod: "Internal Wallet Transfer",
                },
            ],
            { session },
        );

        // 4. Update Trip Status
        trip.paymentStatus = "Completed";
        trip.paymentMethod = "Wallet";
        await trip.save({ session });

        // Lock in the database changes permanently
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: "Payment successful",
            passengerBalance: passenger.walletBalance,
        });
    } catch (error) {
        // If ANY of the operations fail, rollback everything to its exact previous state
        await session.abortTransaction();
        session.endSession();
        // Re-throw so the catchAsync wrapper can handle it cleanly
        throw error;
    }
});

// 4. GET FULL TRANSACTION HISTORY
exports.getTransactionHistory = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { pageNO, limit, type } = req.query;

    // Base filter locked to the authenticated user
    const filter = { userId };

    // Apply optional cash-flow filtering
    if (type) {
        filter.transactionType = type;
    }

    const populateOpts = [
        { path: "tripId", select: "pickupLocation destination" },
    ];

    // Seamlessly uses our pagination utility for clean frontend rendering
    const result = await paginate(
        Transaction,
        pageNO,
        limit,
        filter,
        populateOpts,
    );

    res.status(200).json(result);
});
