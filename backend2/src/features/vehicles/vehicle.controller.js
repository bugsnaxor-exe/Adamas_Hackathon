const Vehicle = require('./vehicle.model'); // Adjust path if needed

// 1. ADD A NEW VEHICLE
exports.addVehicle = async (req, res) => {
  try {
    const { ownerId, vehicleModel, registrationNumber, seatingCapacity } = req.body;

    // Optional: Check if a vehicle with this registration number already exists
    const existingVehicle = await Vehicle.findOne({ registrationNumber });
    if (existingVehicle) {
      return res.status(400).json({ message: 'A vehicle with this registration number already exists.' });
    }

    const newVehicle = await Vehicle.create({
      ownerId,
      vehicleModel,
      registrationNumber,
      seatingCapacity
    });

    res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle', error: error.message });
  }
};

// 2. GET ALL VEHICLES FOR A SPECIFIC USER
// (Drivers need this to select which car they are using before publishing a ride)
exports.getUserVehicles = async (req, res) => {
  try {
    const { userId } = req.params;
    const vehicles = await Vehicle.find({ ownerId: userId }).sort({ createdAt: -1 });
    
    res.status(200).json({ results: vehicles.length, vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};

// 3. UPDATE VEHICLE DETAILS
exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updates, { 
      new: true, // Returns the updated document
      runValidators: true // Ensures minimum seating capacity is still respected
    });

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle updated', vehicle: updatedVehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
};

// 4. DELETE A VEHICLE
exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
};