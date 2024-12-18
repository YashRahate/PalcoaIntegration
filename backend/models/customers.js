const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

});


const customer = mongoose.model('customer', customerSchema);

module.exports = customer;