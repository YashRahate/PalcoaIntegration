// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserModel = require("../Models/User");


// const signup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const user = await UserModel.findOne({ email });
//         if (user) {
//             return res.status(409)
//                 .json({ message: 'User already exist, you can login', success: false });
//         }
//         const userModel = new UserModel({ name, email, password });
//         userModel.password = await bcrypt.hash(password, 10);
//         await userModel.save();
//         res.status(201)
//             .json({
//                 message: "Signup Successful",
//                 success: true
//             })
//     } catch (err) {
//         res.status(500)
//             .json({
//                 message: "Internal server errror",
//                 success: false
//             })
//     }
// }


// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await UserModel.findOne({ email });
//         const errorMsg = 'Auth failed email or password is wrong';
//         if (!user) {
//             return res.status(403)
//                 .json({ message: errorMsg, success: false });
//         }
//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if (!isPassEqual) {
//             return res.status(403)
//                 .json({ message: errorMsg, success: false });
//         }
//         const jwtToken = jwt.sign(
//             { email: user.email, _id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         )

//         res.status(200)
//             .json({
//                 message: "Login Success",
//                 success: true,
//                 jwtToken,
//                 email,
//                 name: user.name
//             })
//     } catch (err) {
//         res.status(500)
//             .json({
//                 message: "Internal server errror",
//                 success: false
//             })
//     }
// }

// module.exports = {
//     signup,
//     login
// }

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomerModel = require("../models/customers"); // Updated import for the new model

const signup = async (req, res) => {
    try {
        const { name, email, contact, gender, password } = req.body;

        // Check if a user already exists with the given email
        const existingCustomer = await CustomerModel.findOne({ email });
        if (existingCustomer) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }

        // Create a new customer instance
        const newCustomer = new CustomerModel({
            name,
            email,
            contact,
            gender,
            password: await bcrypt.hash(password, 10) // Hash the password
        });

        // Save the customer to the database
        await newCustomer.save();

        res.status(201).json({
            message: "Signup Successful",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if a customer exists with the given email
        const customer = await CustomerModel.findOne({ email });
        const errorMsg = 'Auth failed: email or password is wrong';
        if (!customer) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        // Generate a JWT token
        const jwtToken = jwt.sign(
            { email: customer.email, _id: customer._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login Successful",
            success: true,
            jwtToken,
            email,
            name: customer.name,
            contact: customer.contact,
            gender: customer.gender
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
