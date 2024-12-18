const mongoose = require('mongoose');
const outlet = require('./outlets');

const signupUserSchema = new mongoose.Schema({
    staff_name: {
        type: String,
        required: true,
        unique: true
    },
    category:{                      // Employee , Manager or Admin
        type: String,
        required: true,
    },
    staff_mobile_number:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() { return this.category === 'manager'; } // Password required for managers only
    },
    role: {                  
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    outlet_id: {        
        type: Object,
        ref: 'outlet',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SignupUser = mongoose.model('SignupUser', signupUserSchema);

module.exports = SignupUser;