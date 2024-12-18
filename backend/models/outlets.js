const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletSchema = new Schema({ 
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  outlet_name: {
    type: String,
    required: true
  },
  google_map_link: {
    type: String,
    required: false
  },
  telephone_number: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // outlet_password:{
  //   type: String,
  //   required:false
  // }
});

const outlet = mongoose.model('outlet', outletSchema);

module.exports = outlet;
