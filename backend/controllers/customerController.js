const Service = require('../models/services');
const Package = require('../models/packages');
const Outlet = require('../models/outlets');

// Fetch all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find({}, "_id service_name price"); // Return only needed fields
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({}, "_id package_name price").populate("services", "service_name");
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages", error });
  }
};


// Fetch all outlets
const getOutlets = async (req, res) => {
  try {
    const outlets = await Outlet.find();
    res.status(200).json(outlets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching outlets', error });
  }
};

module.exports = {
  getServices,
  getPackages,
  getOutlets
};
