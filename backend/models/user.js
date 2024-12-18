const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  mobile_phone: {
    type: String,
    required: true, // Mobile phone is mandatory
  },
  email: {
    type: String,
    required: false, // Email is optional
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
