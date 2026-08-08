const Trip = require('./trip.model');
const Ride = require('../rides/ride.model'); 

// 1. BOOK A TRIP
exports.bookTrip = async (req, res) => {
  try {
    const { rideId, passengerId, paymentMethod } = req.body;

    // 1. Verify the ride exists and has seats
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    if (ride.availableSeats < 1) {
      return res.status(400).json({ message: 'Sorry, this ride is fully booked.' });
    }
    if (ride.driverId.toString() === passengerId) {
      return res.status(400).json({ message: 'Drivers cannot book their own ride.' });
    }

    // 2. Create the Trip
    const newTrip = await Trip.create({
      rideId,
      passengerId,
      driverId: ride.driverId,
      fareDetails: ride.farePerSeat, // Pull fare directly from the ride details
      paymentMethod: paymentMethod || 'UPI',
      tripStatus: 'Scheduled',
      paymentStatus: 'Pending'
    });

    // 3. Decrement available seats on the Ride
    ride.availableSeats -= 1;
    await ride.save();

    res.status(201).json({ message: 'Trip booked successfully', trip: newTrip });
  } catch (error) {
    res.status(500).json({ message: 'Error booking trip', error: error.message });
  }
};

// 2. GET TRIP DETAILS
exports.getTripDetails = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('passengerId', 'name phone')
      .populate('driverId', 'name phone')
      .populate('rideId', 'pickupLocation destination travelDateTime');

    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip', error: error.message });
  }
};

// 3. UPDATE TRIP STATUS (Start, Complete, or Cancel)
exports.updateTripStatus = async (req, res) => {
  try {
    const { tripStatus } = req.body; // "Ongoing", "Completed", or "Cancelled"
    
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    trip.tripStatus = tripStatus;
    await trip.save();

    // If cancelled, return the seat back to the Ride pool
    if (tripStatus === 'Cancelled') {
      const ride = await Ride.findById(trip.rideId);
      if (ride) {
        ride.availableSeats += 1;
        await ride.save();
      }
    }

    res.status(200).json({ message: `Trip marked as ${tripStatus}`, trip });
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip status', error: error.message });
  }
};

// 4. UPDATE PAYMENT STATUS
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, paymentMethod } = req.body; 
    
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    trip.paymentStatus = paymentStatus;
    if (paymentMethod) trip.paymentMethod = paymentMethod;
    
    await trip.save();

    res.status(200).json({ message: 'Payment status updated', trip });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error: error.message });
  }
};

// 5. GET USER'S TRIP HISTORY (Works for both Passengers and Drivers)
exports.getUserTrips = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.query; // Pass ?role=passenger or ?role=driver in the URL

    let query = {};
    if (role === 'driver') {
      query.driverId = userId;
    } else {
      query.passengerId = userId; // Default to passenger
    }

    const trips = await Trip.find(query)
      .populate('rideId', 'pickupLocation destination travelDateTime')
      .sort({ createdAt: -1 });

    res.status(200).json({ results: trips.length, trips });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
};