const express = require("express");
const {
  getAppointments,
  rescheduleAppointment,
  cancelAppointment,
} = require("../controllers/myAppointmentsController");

const Router = express.Router();

// Get appointments
Router.get("/", getAppointments);

// Reschedule an appointment
Router.put("/reschedule/:id", rescheduleAppointment);

// Cancel an appointment
Router.delete("/cancel/:id", cancelAppointment);

module.exports = Router;
