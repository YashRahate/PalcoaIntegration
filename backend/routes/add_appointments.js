// Desc: This file contains the routes for adding appointments
const ServiceAppointment = require("../models/service_appointment");
const SignupUser = require("../models/signupUser");
const Service = require("../models/services");
const Package = require("../models/packages");
const Outlet = require("../models/outlets");
const Appointment = require("../models/appointments");
const express = require("express");
const Router = express.Router();
const verifyToken = require("../middlewares/verify_jwt_token");
const { sendEmail } = require("../middlewares/email_system");
const service = require("../models/services");

// Add a new appointment
Router.post("/add-appointment-staff", async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_mobile_phone,
      status,
      time,
      staff_id,
      services,
      packages,
      appointment_id,
      outlet_id,
      remark,
    } = req.body;

    // Validate if staff, services, and packages exist
    // const staff = await SignupUser.findById(staff_id);
    const outlet = await Outlet.findById(outlet_id);
    const serviceObjects = await Service.find({ _id: { $in: services } });
    const packageObjects = await Package.find({ _id: { $in: packages } });

    // if (!staff || !serviceObjects.length || !packageObjects.length) {
    //     return res.status(404).json({ message: "Staff, services, or packages not found." });
    // }

    const service_appointment = new ServiceAppointment({
      customer_name,
      customer_email,
      customer_mobile_phone,
      status,
      time,
      // staff_id: staff._id,
      outlet_id: outlet._id,
      service_id: serviceObjects.map((s) => s._id),
      package_id: packageObjects.map((p) => p._id),
      // appointment_id: appointment_id ? await Appointment.findById(appointment_id) : null
      remark,
    });

    await service_appointment.save();

    res
      .status(200)
      .json({ message: "Appointment added successfully", service_appointment });
  } catch (error) {
    console.log("Error while adding appointment", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.put("/update-appointment-staff/:id", async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_mobile_phone,
      status,
      time,
      staff_id,
      services,
      packages,
      appointment_id,
      outlet_id,
    } = req.body;

    // console.log("update_req_body", req.body);

    const service_appointment = await ServiceAppointment.findById(
      req.params.id
    );
    console.log("service_appointment", service_appointment);

    if (!service_appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Validate if staff, services, and packages exist
    const staff = await SignupUser.findById(staff_id);
    const outlet = await Outlet.findById(outlet_id);
    const serviceObjects = await Service.find({ _id: { $in: services } });
    const packageObjects = await Package.find({ _id: { $in: packages } });

    service_appointment.customer_name = customer_name;
    service_appointment.customer_email = customer_email;
    service_appointment.customer_mobile_phone = customer_mobile_phone;
    service_appointment.status = status;
    service_appointment.time = time;
    // service_appointment.staff_id = staff._id;
    service_appointment.outlet_id = outlet._id;
    service_appointment.service_id = serviceObjects;
    service_appointment.package_id = packageObjects;
    service_appointment.appointment_id = appointment_id
      ? await Appointment.findById(appointment_id)
      : null;

    await service_appointment.save();
    console.log("service_appointment", service_appointment);
    res.status(200).json({
      message: "Appointment updated successfully",
      service_appointment,
    });
  } catch (error) {
    console.log("Error while updating appointment", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Get all appointments without any filtering
Router.get("/get-all-appointments-staff", async (req, res) => {
  try {
    const service_appointments = await ServiceAppointment.find({
      status: "pending",
    })
      .populate("staff_id", "staff_name email")
      .populate("service_id", "service_name price")
      .populate("package_id", "package_name price")
      .populate("outlet_id", ["outlet_name", "address"])
      .populate("appointment_id", "date");

    res.status(200).json({ service_appointments });
    // console.log(service_appointments)
  } catch (error) {
    console.log("Error while fetching appointments", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.get("/get-all-appointments-staff-confirm", async (req, res) => {
  try {
    const service_appointments = await ServiceAppointment.find({
      status: "confirmed",
    })
      .populate("staff_id", "staff_name email")
      .populate("service_id", "service_name price")
      .populate("package_id", "package_name price")
      .populate("outlet_id", ["outlet_name", "address"])
      .populate("appointment_id", "date");

    res.status(200).json({ service_appointments });
    // console.log(service_appointments)
  } catch (error) {
    console.log("Error while fetching appointments", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.get("/get-all-appointments-staff-without-filter", async (req, res) => {
  const { outlet_id } = req.query;
  console.log(outlet_id);
  try {
    const service_appointments = await ServiceAppointment.find({ outlet_id })
      .populate("staff_id", "staff_name email")
      .populate("service_id", "service_name price")
      .populate("package_id", "package_name price")
      .populate("outlet_id", ["outlet_name", "address"])
      .populate("appointment_id", "date");

    res.status(200).json({ service_appointments });
    console.log(service_appointments);
  } catch (error) {
    console.log("Error while fetching appointments", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Confirm an appointment
Router.put("/confirm-appointment/:id", async (req, res) => {
  try {
    const service_appointment = await ServiceAppointment.findById(
      req.params.id
    );
    if (!service_appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    service_appointment.status = "confirmed"; // Update status to confirmed
    await service_appointment.save();
    const services = await Service.find({
      _id: { $in: service_appointment.service_id },
    });
    const packages = await Package.find({
      _id: { $in: service_appointment.package_id },
    });
    const address = await Outlet.findById(service_appointment.outlet_id);
    // Send confirmation email
    const emailContent = `
    <h1>Appointment Confirmed</h1>
    <p>Dear ${service_appointment.customer_name},</p>
    <p>Your appointment has been successfully confirmed.</p>
   
    <p><strong>Services to be availed:</strong>${
      services.length > 0
        ? services.map((service) => service.service_name).join(", ")
        : "No services selected"
    }</p>
    <p></p>
   
    <p><strong>Packages to be availed:</strong>${
      packages.length > 0
        ? packages
            .map((pkg) => pkg.package_name || "Unnamed Package")
            .join(", ")
        : "No packages selected"
    }</p>
    <p></p>
   
    <p><strong>Address of the Outlet:</strong>${
      address.address || "Address not available"
    }</p>
    <p></p>
   
    <p><strong>Date/Time:</strong> ${new Date(
      service_appointment.time
    ).toLocaleString()}</p>
    <p>We look forward to seeing you!</p>
   `;

    await sendEmail(service_appointment.customer_email, emailContent); // Send confirmation email

    res.status(200).json({
      message: "Appointment confirmed successfully",
      service_appointment,
    });
  } catch (error) {
    console.log("Error while confirming appointment", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Confirm an appointment
Router.put("/confirm-payment/:id", async (req, res) => {
  try {
    const service_appointment = await ServiceAppointment.findById(
      req.params.id
    );
    if (!service_appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    service_appointment.status = "confirmed"; // Update status to confirmed
    await service_appointment.save();

    res.status(200).json({
      message: "Initialise payment",
      service_appointment,
    });
  } catch (error) {
    console.log("Error while confirming appointment", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.delete("/delete-appointment-staff/:id", async (req, res) => {
  try {
    const service_appointment = await ServiceAppointment.findById(
      req.params.id
    );
    if (!service_appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await ServiceAppointment.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.log("Error while deleting appointment", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { AppointmentRoutes: Router };
