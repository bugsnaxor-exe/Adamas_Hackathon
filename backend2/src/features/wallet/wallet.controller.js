const Transaction = require('./transaction.model');
const User = require('../users/user.model'); // Adjust path based on your structure
const Trip = require('../trips/trip.model'); // Adjust path based on your structure

// 1. GET WALLET BALANCE & RECENT TRANSACTIONS
exports.getWalletDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('name walletBalance');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10); 

    res.status(200).json({
      balance: user.walletBalance,
      transactions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wallet details', error: error.message });
  }
};

// 2. RECHARGE WALLET
exports.rechargeWallet = async (req, res) => {
  try {
    const { userId, amount, paymentMethod } = req.body;

    // In a real app, this endpoint would be called AFTER a successful Razorpay/Stripe webhook
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 1. Update User's balance
    user.walletBalance += Number(amount);
    await user.save();

    // 2. Create Transaction Ledger Entry
    const transaction = await Transaction.create({
      userId,
      transactionType: 'Credit',
      amount: Number(amount),
      description: 'Wallet Recharge',
      paymentMethod: paymentMethod || 'Razorpay'
    });

    res.status(200).json({ 
      message: 'Wallet recharged successfully', 
      newBalance: user.walletBalance,
      transaction 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error recharging wallet', error: error.message });
  }
};

// 3. PAY FOR TRIP USING WALLET (Passenger to Driver Transfer)
exports.payForTrip = async (req, res) => {
  try {
    const { passengerId, tripId, amount } = req.body;

    // 1. Validate Trip and Users
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.paymentStatus === 'Completed') return res.status(400).json({ message: 'Trip is already paid for' });

    const passenger = await User.findById(passengerId);
    const driver = await User.findById(trip.driverId);

    if (!passenger || !driver) return res.status(404).json({ message: 'User(s) not found' });
    if (passenger.walletBalance < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance. Please recharge.' });
    }

    // 2. Deduct from Passenger (Debit)
    passenger.walletBalance -= Number(amount);
    await passenger.save();

    await Transaction.create({
      userId: passenger._id,
      transactionType: 'Debit',
      amount: Number(amount),
      description: `Payment for Trip`,
      tripId: trip._id,
      paymentMethod: 'Internal Wallet Transfer'
    });

    // 3. Add to Driver (Credit)
    driver.walletBalance += Number(amount);
    await driver.save();

    await Transaction.create({
      userId: driver._id,
      transactionType: 'Credit',
      amount: Number(amount),
      description: `Earnings from Trip`,
      tripId: trip._id,
      paymentMethod: 'Internal Wallet Transfer'
    });

    // 4. Update Trip Status
    trip.paymentStatus = 'Completed';
    trip.paymentMethod = 'Wallet';
    await trip.save();

    res.status(200).json({ 
      message: 'Payment successful', 
      passengerBalance: passenger.walletBalance 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

// 4. GET FULL TRANSACTION HISTORY
exports.getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const transactions = await Transaction.find({ userId })
      .populate('tripId', 'pickupLocation destination')
      .sort({ createdAt: -1 });

    res.status(200).json({ results: transactions.length, transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
};