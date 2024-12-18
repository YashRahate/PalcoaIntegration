const mongoose = require("mongoose");
const outlet = require("./outlets");
const Schema = mongoose.Schema;

const serviceAppointmentSchema = new Schema({
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: false },
  customer_mobile_phone: { type: String, required: true },
  status: { type: String, required: true },
  time: { type: Date, required: true },
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SignupUser",
    required: false,
  },
  outlet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "outlet",
    required: true,
  },
  service_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "service" }], // Array of service IDs
  package_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Package" }], // Array of package IDs
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: "appointment" },
  remark: {
    type: String,
    required: false
  },
});

const ServiceAppointment = mongoose.model(
  "serviceappointment",
  serviceAppointmentSchema
);

module.exports = ServiceAppointment;
