// Imports
const app = require("express");

const mongoose = require("mongoose");
const { makeSignupUser } = require("./routes/signup_route");
const { outletRoute } = require("./routes/outlet_route");
const { serviceRoutes } = require("./routes/services");
const {packageRoutes} = require("./routes/package")
const {AppointmentRoutes} = require("./routes/add_appointments")
const userRoutes = require("./routes/user");
const cors = require('cors');
const { outletMaster } = require("./routes/outlet_master");
const { PaymentRouter } = require("./routes/payment_master");
const AuthRouter = require('./routes/AuthRouter');
const customerRoutes = require('./routes/customerRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const myAppointmentsRoutes = require("./routes/myAppointmentsRoutes");
const Razorpay = require('razorpay');
const crypto = require('crypto');

const session = require('express-session');

// Server configuration
const server = app();
const port = 5000

// Middlewares
server.use(cors());  // should always be kept at the top
server.use(app.json());
server.use(app.urlencoded({ extended: true }));
// Code for using sessions for login
server.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}
}))
server.use('/api', makeSignupUser)
server.use('/api', outletRoute)
server.use('/api', serviceRoutes);
server.use('/api', packageRoutes)
server.use('/api',AppointmentRoutes);
server.use('/api',outletMaster);
server.use("/api", userRoutes);
server.use("/api", PaymentRouter);
server.use('/auth', AuthRouter);
server.use('/customer', customerRoutes);
server.use('/payment', paymentsRoutes);
server.use("/myappointments", myAppointmentsRoutes);

require("dotenv").config();


// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(port, () => {
      console.log("Mongo DB is connected and Server is running on port 5000");
    });

  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Add this route to handle payment order creation
server.post('/payment/createOrder', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: crypto.randomBytes(10).toString('hex'), // Unique receipt id
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Error creating payment order');
  }
});

// Checking the server
server.get('/', (req, res) => {
  res.json({ "message": "Server is running !!!" })
  console.log('Server is running !!!')
})




