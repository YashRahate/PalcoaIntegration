const express = require('express');
const router = express.Router();
const { savePayment } = require('../controllers/paymentsController');

// POST route to save payment
router.post('/save-payment', savePayment);

module.exports = router;
