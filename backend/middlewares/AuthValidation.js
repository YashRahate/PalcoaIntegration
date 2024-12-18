// const Joi = require('joi');

// const signupValidation = (req, res, next) => {
//     const schema = Joi.object({
//         name: Joi.string().min(3).max(100).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(4).max(100).required()
//     });
//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400)
//             .json({ message: "Bad request", error })
//     }
//     next();
// }
// const loginValidation = (req, res, next) => {
//     const schema = Joi.object({
//         email: Joi.string().email().required(),
//         password: Joi.string().min(4).max(100).required()
//     });
//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400)
//             .json({ message: "Bad request", error })
//     }
//     next();
// }
// module.exports = {
//     signupValidation,
//     loginValidation
// }

const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        contact: Joi.string().pattern(/^[0-9]{10}$/).required() // Assuming contact is a 10-digit phone number
            .messages({
                "string.pattern.base": "Contact must be a valid 10-digit phone number",
            }),
        gender: Joi.string()
        .valid('Male', 'Female', 'Other')
        .insensitive() // This makes it case-insensitive
        .required()
        .messages({
          "any.only": "Gender must be 'Male', 'Female', or 'Other'"
        }),
      
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
