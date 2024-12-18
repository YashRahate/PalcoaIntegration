const ServiceAppointment = require("../models/service_appointment");
const Service = require("../models/services");
const Package = require("../models/packages");
const Outlet = require("../models/outlets");

// Fetch appointments (upcoming and previous)
// Fetch appointments (upcoming and previous)
const getAppointments = async (req, res) => {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const currentDateTime = new Date();
      const appointments = await ServiceAppointment.find({
        customer_email: email,
      })
        .populate("service_id", "service_name") // Populating service names
        .populate("package_id", "package_name") // Populating package names
        .populate("outlet_id", "outlet_name address"); // Populating outlet details
  
      const upcoming = appointments.filter(
        (appointment) => new Date(appointment.time) > currentDateTime
      );
      const previous = appointments.filter(
        (appointment) => new Date(appointment.time) <= currentDateTime
      );
  
      res.status(200).json({ upcoming, previous });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const rescheduleAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      const { newDate, newTime, newOutlet } = req.body;
  
      console.log("Received data:", { id, newDate, newTime, newOutlet }); // Log the incoming data
  
      const appointment = await ServiceAppointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
  
      if (appointment.status !== "pending") {
        return res.status(400).json({
          message: "Only appointments with 'Pending' status can be rescheduled.",
        });
      }
  
      if (!newDate || !newTime || !newOutlet) {
        return res.status(400).json({ message: "Incomplete reschedule details" });
      }
  
      appointment.time = new Date(`${newDate}T${newTime}`);
      appointment.outlet_id = newOutlet;
  
      await appointment.save();
  
      res.status(200).json({
        message: "Appointment rescheduled successfully",
        appointment,
      });
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await ServiceAppointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAppointments,
  rescheduleAppointment,
  cancelAppointment,
};
