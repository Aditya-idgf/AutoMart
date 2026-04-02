const express = require('express');
const router = express.Router();
const { 
    createVehicle, 
    getVehicles, 
    getVehicleById, 
    updateVehicle, 
    deleteVehicle 
} = require('../controllers/vehicleController');

// Setup Vehicle routes
router.route('/')
    .post(createVehicle)
    .get(getVehicles);

router.route('/:id')
    .get(getVehicleById)
    .put(updateVehicle)
    .delete(deleteVehicle);

module.exports = router;
