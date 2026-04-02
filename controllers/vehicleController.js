const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

// @desc    Create a vehicle listing
// @route   POST /api/vehicles
// @access  Public (Simulating pass sellerId)
const createVehicle = async (req, res) => {
    try {
        // We simulate authentication by requiring sellerId in body
        const { sellerId, title, description, category, price, make, model, year, images, status } = req.body;

        if (!sellerId || !title || !description || !category || !price || !make || !model || !year) {
            return res.status(400).json({ message: 'Please provide all required fields including sellerId' });
        }

        const userStrExists = await User.findById(sellerId);
        if (!userStrExists) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const vehicle = await Vehicle.create({
            sellerId,
            title,
            description,
            category,
            price,
            make,
            model,
            year,
            images,
            status
        });

        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all vehicles (with query filters)
// @route   GET /api/vehicles
// @access  Public
const getVehicles = async (req, res) => {
    try {
        let query = {};
        
        // Exact filter by category
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Search by make
        if (req.query.make) {
            query.make = { $regex: req.query.make, $options: 'i' };
        }

        // Search by model
        if (req.query.model) {
            query.model = { $regex: req.query.model, $options: 'i' };
        }

        // Price range filter
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }

        const vehicles = await Vehicle.find(query).populate('sellerId', 'name email contactNumber');
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a specific vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate('sellerId', 'name email contactNumber');
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a vehicle listing
// @route   PUT /api/vehicles/:id
// @access  Public (Simulating auth check with an optional sellerId provided, but for simplicity assuming open)
const updateVehicle = async (req, res) => {
    try {
        // Optionally, one could check if req.body.sellerId matches the existing vehicle's sellerId
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a vehicle listing
// @route   DELETE /api/vehicles/:id
// @access  Public
const deleteVehicle = async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json({ message: 'Vehicle removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};
