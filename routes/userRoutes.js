const express = require('express');
const router = express.Router();
const { createMockUser, getUsers } = require('../controllers/userController');

// Define user routes
router.route('/')
    .post(createMockUser)
    .get(getUsers);

module.exports = router;
