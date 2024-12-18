const Payment = require('../models/payment');

// Save payment data
const savePayment = async (req, res) => {
  try {
    const {
      mode,
      amount,
      booking_amount,
      payment_date,
      payment_status,
      customer_id,
    } = req.body;

    // Create a new payment document
    const newPayment = new Payment({
      mode,
      amount,
      booking_amount,
      payment_date: payment_date || new Date(),
      payment_status,
      customer_id,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json({
      message: "Payment successfully saved",
      payment: savedPayment,
    });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({
      message: "Failed to save payment. Please try again.",
      error: error.message,
    });
  }
};

module.exports = {
  savePayment,
};
