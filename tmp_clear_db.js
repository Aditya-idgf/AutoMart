const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Vehicle = require('./models/Vehicle');

dotenv.config();

const clearVehicles = async () => {
    try {
        await connectDB();
        console.log('Clearing Vehicle collection...');
        await Vehicle.deleteMany({});
        console.log('✅ Vehicle collection cleared successfully.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error clearing collection:', error.message);
        process.exit(1);
    }
};

clearVehicles();
