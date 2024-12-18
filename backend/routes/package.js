const express = require('express');
const router = express.Router();
const Package = require('../models/packages');  // Assuming you have a Package model
const Service = require('../models/services');  // Assuming you have a Service model

// GET all packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find().populate('services');  // Populate services
    // console.log(packages)
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET package by ID
router.get('/packages/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id).populate('services');
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new package
router.post('/packages', async (req, res) => {
  try {
    const { package_name, price, estimated_time, category, services } = req.body;
    console.log(req.body)
    const serviceIds = await Service.find({ _id: { $in: services } }).select('_id');  // Find service IDs by name
    const newPackage = new Package({
      package_name:package_name,
      price,
      estimated_time:estimated_time,
      category,
      services: serviceIds.map(s => s._id),  // Store service IDs
    });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update a package
router.put('/packages/:id', async (req, res) => {
  try {
    const { name, price, time, category, services } = req.body;
    const serviceIds = await Service.find({ name: { $in: services } }).select('_id');  // Find service IDs by name
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        time,
        category,
        services: serviceIds.map(s => s._id),  // Update service IDs
      },
      { new: true }
    );
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE a package by ID
router.delete('/packages/:id', async (req, res) => {
    try {
      const deletedPackage = await Package.findByIdAndDelete(req.params.id);
      if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });
      res.status(200).json({ message: 'Package deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = { packageRoutes: router };
