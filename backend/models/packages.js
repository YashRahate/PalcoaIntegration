// const mongoose = require('mongoose');
// import { services } from './../../ams/src/Data/service';
// const Schema = mongoose.Schema;

// const packageSchema = new Schema({

//   price: {
//     type: Number,
//     required: true
//   },
//   category: {
//     type: String,
//     required: true
//   },
//   package_name: {
//     type: String,
//     required: true
//   },
//   estimated_time: {
//     type: String,
//     required: true
//   }
// });

// const package = mongoose.model('package', packageSchema);

// module.exports = package;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const service = require('./services');

// Define the schema for a package
const packageSchema = new Schema({
  package_name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  estimated_time: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'service'  // Assuming you have a Service model
  }]
});

// Create and export the model
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
