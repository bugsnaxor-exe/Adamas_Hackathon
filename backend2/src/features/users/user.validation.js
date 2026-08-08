const Joi = require("joi");

const registerValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).required().messages({
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 2 characters long",
        "any.required": "Name is required",
    }),
    email: Joi.string().trim().email().required().messages({
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
    }),
    phone: Joi.string().trim().min(10).required().messages({
        "string.min": "Phone number must be at least 10 digits",
        "any.required": "Phone number is required",
    }),
    role: Joi.string()
        .valid("Employee", "Company Administrator")
        .default("Employee"),
});

const loginWithEmailSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required",
    }),
});

const requestOtpSchema = Joi.object({
    phone: Joi.string()
        .trim()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must be exactly 10 digits",
            "any.required": "Phone number is required",
        }),
});

const loginWithPhoneSchema = Joi.object({
    phone: Joi.string()
        .trim()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must be exactly 10 digits",
            "any.required": "Phone number is required",
        }),
    otp: Joi.string().trim().length(6).required().messages({
        "string.length": "OTP must be exactly 6 digits",
        "any.required": "OTP is required",
    }),
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required",
    }),
});

const updateProfileSchema = Joi.object({
    name: Joi.string().trim().min(2),
    phone: Joi.string().trim().min(10),
    savedPlaces: Joi.array().items(
        Joi.object({
            label: Joi.string().required(),
            lat: Joi.number().required(),
            lng: Joi.number().required(),
            address: Joi.string().required(),
        }),
    ),
});

module.exports = {
    registerValidationSchema,
    loginWithEmailSchema,
    requestOtpSchema,
    loginWithPhoneSchema,
    forgotPasswordSchema,
    updateProfileSchema,
};
