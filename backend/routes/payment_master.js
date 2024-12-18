const Payment= require('../models/payment');
const ServiceAppointment = require('../models/service_appointment');
const express = require('express');
const Router = express.Router();

Router.post('/payment', async (req, res) => {
    console.log(req.body)
    try {
        const payment = new Payment({
            mode: req.body.paymentmode,
            amount: req.body.amount_value,
            payment_date: Date.now(),
            payment_status: req.body.payment_status,
            // payment_interface: req.body.payment_interface,
            // customer_id: req.body.customer_id,
            appointment_id: req.body.appointment_id
        });
        await payment.save();
        await ServiceAppointment.findByIdAndUpdate(req.body.appointment_id._id , { status: "Paid" });
        res.status(200).json({ message: "Payment done successfully !!", payment });

    } catch (error) {
        console.log("Some error occured while creating payment", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

Router.put('/payment/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Payment updated successfully" });
    } catch (error) {
        console.log("Some error occured while updating payment", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

Router.delete('/payment/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        await Payment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        console.log("Some error occured while deleting payment", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

Router.get('/payment', async (req, res) => {
    try {
        const payment = await Payment.find().populate('payment_details','_id mode amount payment_date payment_status appointment_id');
        res.status(200).json(payment);
    } catch (error) {
        console.log("Some error occured while fetching payment", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = {
    PaymentRouter: Router,
}
