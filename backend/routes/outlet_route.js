const Outlets = require("../models/outlets");
const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const request = require("request");
require("dotenv").config();
const verifyToken = require("../middlewares/verify_jwt_token");
const SignupUser = require("../models/signupUser");

const inMemoryUserDetails = new Object();

// Router.post("/outlet", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.outlet_password, 10);

//     const outlet = new Outlets({
//       name: req.body.name,
//       email: req.body.email,
//       city: req.body.city,
//       state: req.body.state,
//       address: req.body.address,
//       pincode: req.body.pincode,
//       outlet_name: req.body.outlet_name,
//       google_map_link: req.body.google_map_link,
//       telephone_number: req.body.telephone_number,
//       outlet_password: hashedPassword,
//     });
//     await outlet.save();
//     res.status(200).json(outlet);
//   } catch (error) {
//     console.log("Some error occured while creating outlet", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

Router.post("/staff-outlet-login", async (req, res) => {
  if (!req.body || !req.body.mobile_number || !req.body.outlet_password) {
    return res.status(400).json({ error: "id is required" });
  }
  const mobile_number = req.body.mobile_number;
  const outlet_password = req.body.outlet_password;
  try {
    const outlet = await Outlets.findOne({ staff_mobile_number: mobile_number });
    if (
      outlet &&
      (await bcrypt.compare(outlet_password, outlet.outlet_password))
    ) {
      // 
      res.json({
        message: "You are logged in",
        // token: jwt_token,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Some error occured while making you login", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.get("/logout", verifyToken, (req, res) => {
  res.status(200).json({
    message: "You are logged out",
  });
});


Router.post("/get-otp", async (req, res) => {
  const { outlet_password, mobile_number } = req.body;
  const signupUser = await SignupUser.findOne({ staff_mobile_number: mobile_number });
  console.log(signupUser);
  if (signupUser &&
    (await bcrypt.compare(outlet_password, signupUser.password))) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    var options = {
      'method': 'POST',
      'url': 'https://2factor.in/API/R1/',
      'headers': {
      },
      form: {
        'module': 'TRANS_SMS',
        'apikey': process.env.TWO_FACTOR_API_KEY,
        'to': '91' + mobile_number,
        'from': 'SALONX',
        'msg': 'Hi Customer, Your one time password for phone verification is ' + otp,
      }
    };
    request(options, function (error, response) {
      if (error) {
        console.error(error);
        return res.status(500).send('Failed to send SMS');
      }
      console.log(response.body);
      res.status(200).json({ msg: "OTP sent successfully", otp: otp });
    });
    inMemoryUserDetails['user_data']=signupUser;
  }
  else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

Router.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;
  
  try {
    const jwt_token = jwt.sign({ otp: otp }, process.env.JWT_SECRET, { expiresIn: '1h' });
    req.session.jwt_token = jwt_token;
    res.status(200).send({ msg: "OTP verified", token: jwt_token , user_data: inMemoryUserDetails.user_data});

  } catch (error) {
    console.log("Some error occured while verifying OTP", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.get('/logout', verifyToken, (req, res) => {
  req.session.destroy();
  console.log('Logged out')
  res.status(200).json({ message: "You are logged out" });
});

module.exports = {
  outletRoute: Router,
};
