const express = require('express');
const router = express.Router();
const { submitInquiry, getInquiriesByVehicleId } = require('../controllers/inquiryController');

// Define inquiry routes
router.route('/')
    .post(submitInquiry);

router.route('/vehicle/:vehicleId')
    .get(getInquiriesByVehicleId);

module.exports = router;
