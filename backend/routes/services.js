// // routes/services.js
// const express = require('express');
// const router = express.Router();
// const Service = require('../models/services');

// // Get all services
// router.get('/services', async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.status(200).json(services);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a new service
// router.post('/services', async (req, res) => {
//   const { name, price, duration } = req.body;
//   const service = new Service({
//     service_name: name,
//     price,
//     estimated_time: duration,
//     category: "default"  // or whatever category you want
//   });

//   try {
//     const newService = await service.save();
//     res.status(201).json(newService);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Get a specific service by ID
// router.get('/services/:id', async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });
//     res.status(200).json(service);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update a service by ID
// router.put('/services/:id', async (req, res) => {
//   try {
//     const { name, price, duration } = req.body;
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     service.service_name = name || service.service_name;
//     service.price = price || service.price;
//     service.estimated_time = duration || service.estimated_time;

//     const updatedService = await service.save();
//     res.status(200).json(updatedService);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a service by ID
// router.delete('/services/:id', async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     await service.remove();
//     res.status(200).json({ message: 'Service deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = { serviceRoutes: router };
const express = require('express');
const router = express.Router();
const Service = require('../models/services');

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new service
router.post('/services', async (req, res) => {
  const { name, price, duration } = req.body;
  const service = new Service({
    service_name: name,
    price,
    estimated_time: duration,
    category: "default"  // static or dynamic, adjust as needed
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific service by ID
router.get('/services/:id', async (req, res) => {
  try {
    console.log(`Fetching service with ID: ${req.params.id}`);
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a service by ID
router.put('/services/:id', async (req, res) => {
  try {
    const { name, price, duration } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    service.service_name = name || service.service_name;
    service.price = price || service.price;
    service.estimated_time = duration || service.estimated_time;

    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a service by ID
router.delete('/services/:id', async (req, res) => {
  try {
    
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.remove();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { serviceRoutes: router };
