const express = require('express');
const Router = express.Router();
const User = require('../models/user');

// Add a new user
Router.post('/add-user', async (req, res) => {
  try {
    const { full_name, mobile_phone, email } = req.body;

    if (!full_name || !mobile_phone) {
      return res.status(400).json({ message: 'Full name and mobile phone are required.' });
    }

    const newUser = new User({
      full_name,
      mobile_phone,
      email,
    });

    await newUser.save();
    res.status(200).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Get users by mobile_phone
Router.get('/get-users', async (req, res) => {
  try {
    const { mobile_phone } = req.query;
    const query = mobile_phone ? { mobile_phone: new RegExp(mobile_phone, 'i') } : {};
    
    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = Router;
