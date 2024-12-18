const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({

  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  service_name: {
    type: String,
    required: true
  },
  estimated_time: {
    type: String,
    required: true
  }
});

const service = mongoose.model('service', serviceSchema);

module.exports = service;
