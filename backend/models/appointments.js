const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: false
  },
  staff_id: {
    type: Object,
    ref: 'SignupUser',
    required: true,
    unique: true
  },
  outlet_id: {
    type: Object,
    ref: 'outlet',
    required: true,
    unique: true
  },
  customer_id: {
    type: Object,
    ref: 'customer',
    required: true,
    unique: true
  }
});

const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;
