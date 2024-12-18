const express = require('express');
const router = express.Router();
const Customer = require('../models/customers');
const {
  getServices,
  getPackages,
  getOutlets
} = require('../controllers/customerController');

// Routes
router.get('/services', getServices);
router.get('/packages', getPackages);
router.get('/outlets', getOutlets);

router.get('/get-customer', async (req, res) => {
  try {
    const email = req.query.email; // Get email from query params
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const customer = await Customer.findOne({ email }).select('name email contact');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
