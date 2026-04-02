const Inquiry = require('../models/Inquiry');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

// @desc    Submit an inquiry for a vehicle
// @route   POST /api/inquiries
// @access  Public (Simulating pass buyerId)
const submitInquiry = async (req, res) => {
    try {
        const { vehicleId, buyerId, message, appointmentDate } = req.body;

        if (!vehicleId || !buyerId || !message || !appointmentDate) {
            return res.status(400).json({ message: 'Please provide vehicleId, buyerId, message, and appointmentDate' });
        }

        const vehicleExists = await Vehicle.findById(vehicleId);
        if (!vehicleExists) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        const buyerExists = await User.findById(buyerId);
        if (!buyerExists) {
            return res.status(404).json({ message: 'Buyer not found' });
        }

        const inquiry = await Inquiry.create({
            vehicleId,
            buyerId,
            message,
            appointmentDate
        });

        res.status(201).json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get inquiries by vehicle ID
// @route   GET /api/inquiries/vehicle/:vehicleId
// @access  Public
const getInquiriesByVehicleId = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({ vehicleId: req.params.vehicleId })
            .populate('buyerId', 'name email contactNumber')
            .populate('vehicleId', 'title make model year');
            
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    submitInquiry,
    getInquiriesByVehicleId
};
