// const verifyToken = require("../middlewares/verify_jwt_token");
// const Outlets = require("../models/outlets");
// const User = require("../models/signupUser");
// const bcrypt = require("bcryptjs");
// const express = require("express");
// const Router = express.Router();

const express = require('express');
const SignupUser = require('../models/signupUser');
const bcrypt = require('bcryptjs');
const Router = express.Router();

// Create new employee or manager
Router.post('/signup', async (req, res) => {
  const { staff_name, email, password, category, role, gender, staff_mobile_number, outlet_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new SignupUser({
      staff_name,
      email,
      password: hashedPassword,
      category,
      role,
      gender,
      staff_mobile_number,
      outlet_id
    });

    await newUser.save();
    res.status(200).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});
Router.get('/get-employee', async (req, res) => {
  try {
    const { staff_mobile_number } = req.query;
    const mobileNumber = staff_mobile_number ? Number(staff_mobile_number) : null;
    const query = mobileNumber ? { staff_mobile_number: mobileNumber } : {};
    
    const users = await SignupUser.find(query);
    res.status(200).json(users);  // Returning the array of users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Update existing staff to manager and set password
Router.post('/update-to-manager', async (req, res) => {
  const { staff_mobile_number, password } = req.body;

  try {
    // Search for user by mobile number
    let existingUser = await SignupUser.findOne({ staff_mobile_number });

    if (existingUser) {
     
      existingUser.role = "manager"; // Update role to 'manager'
      existingUser.password = await bcrypt.hash(password, 10); // Hash and update the password

      await existingUser.save(); // Save the updated user

      return res.status(200).json({ message: 'User updated to manager successfully', updatedUser: existingUser });
    } else {
      // User does not exist
      return res.status(404).json({ message: 'User not found with the provided mobile number' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error });
  }
});

Router.post('/signup-staff', async (req, res) => {
  const { staff_name, email,  category, role, gender, staff_mobile_number, outlet_id } = req.body;

  try {
    const newUser = new SignupUser({
      staff_name,
      email,
      category,
      role,
      gender,
      staff_mobile_number,
      outlet_id
    });

    await newUser.save();
    res.status(200).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});
// Fetch users by mobile phone
Router.get('/get-users-staff', async (req, res) => {
  try {
    const { staff_mobile_number } = req.query;

    // Convert the query parameter to a number
    const mobileNumber = staff_mobile_number ? Number(staff_mobile_number) : null;

    // Query for the exact mobile number match
    const query = mobileNumber ? { staff_mobile_number: mobileNumber } : {};

    const users = await SignupUser.find(query);

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});


module.exports = {
  makeSignupUser: Router
};
