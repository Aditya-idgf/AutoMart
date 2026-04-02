const User = require('../models/User');

// @desc    Create a mock user
// @route   POST /api/users
// @access  Public (Mocking)
const createMockUser = async (req, res) => {
    try {
        const { name, email, contactNumber } = req.body;

        if (!name || !email || !contactNumber) {
            return res.status(400).json({ message: 'Please provide name, email, and contactNumber' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await User.create({
            name,
            email,
            contactNumber
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMockUser,
    getUsers
};
