const Outlets = require("../models/outlets");
const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verify_jwt_token");
// const verifyToken = require("../middleware/verifyToken");
require("dotenv").config();

Router.post("/outlet", async (req, res) => {
  try {
    const outlet = new Outlets({
      outlet_name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      pincode: req.body.pincode,
      outlet_name: req.body.outlet_name,
      google_map_link: req.body.google_map_link,
      telephone_number: req.body.telephone_number,
    });
    await outlet.save();
    res.status(200).json(outlet);
  } catch (error) {
    console.log("Some error occured while creating outlet", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.put("/outlet/:id", async (req, res) => {
  try {
    const outlet = await Outlets.findById(req.params.id);
    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }
    if (req.body.outlet_password) {
      req.body.outlet_password = await bcrypt.hash(req.body.outlet_password, 10);
    }
    await Outlets.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Outlet updated successfully" });
  } catch (error) {
    console.log("Some error occured while updating outlet", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.delete("/outlet/:id", async (req, res) => {
  try {
    const outlet = await Outlets.findById(req.params.id);
    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }
    await Outlets.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Outlet deleted successfully" });
  } catch (error) {
    console.log("Some error occured while deleting outlet", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.get("/outlet", async (req, res) => {
  try {
    const outlet = await Outlets.find();
    console.log("outlets", outlet);
    res.status(200).json(outlet);
  } catch (error) {
    console.log("Some error occured while fetching outlet", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  outletMaster: Router,
}