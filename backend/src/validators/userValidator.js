import Joi from "joi"

export const validateSignup = Joi.object({
    username: Joi.string().required().min(3).max(100),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(16)
})

export const validateLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(16)
})

export const validateForgotPassword = Joi.object({
    email: Joi.string().email().required()
})

export const validateVerifyOtp = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).pattern(/^\d+$/).required()
})

export const validateResetPassword = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).pattern(/^\d+$/).required(),
    newPassword: Joi.string().required().min(8).max(16)
})

export const validateChangePassword = Joi.object({
    currentPassword: Joi.string().required().messages({
        "string.empty": "Current password is required."
    }),
    newPassword: Joi.string().min(8).required().messages({
        "string.min": "New password must be at least 8 characters.",
        "string.empty": "New password is required."
    })
})

export const validateDeleteAccount = Joi.object({
    currentPassword: Joi.string().required().messages({
        "string.empty": "Enter your password to confirm account deletion."
    })
})