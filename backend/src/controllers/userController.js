import { userModel } from "../models/userModel.js"
import { validateSignup, validateLogin, validateForgotPassword, validateResetPassword, validateVerifyOtp, validateChangePassword, validateDeleteAccount } from "../validators/userValidator.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { generateOtp, hashOtp, OTP_EXPIRY_MINUTES } from "../utils/otp.js"

function formatUser(user) {
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        role: user.role,
        location: user.location,
        website: user.website,
        interests: user.interests,
        createdAt: user.createdAt,
    };
}

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body
    try {
        const { error } = validateSignup.validate({
            username,
            email,
            password
        })

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exist, please login instead.",
                data: existingUser
            })
        }

        const newUser = await userModel.create({
            username,
            email,
            password
        })

        const token = await generateToken(newUser._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            message: "User created successfully!",
            data: formatUser(newUser)
        })
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const { error } = validateLogin.validate({
            email,
            password
        })
        if (error)
            return res.status(400).json({
                message: error.details[0].message
            })
        const existingUser = await userModel.findOne({ email })

        if (!existingUser) {
            return res.status(400).json({
                message: "User not found, please signup instead.",
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const token = await generateToken(existingUser._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "User logged in successfully!",
            data: formatUser(existingUser)
        })
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });
    return res.status(200).json({ message: "Logged out successfully." });
};

export const getProfile = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "Profile fetched successfully",
            data: formatUser(user)
        })
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}


export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const { error } = validateForgotPassword.validate({ email })
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const genericResponse = {
            message: "If an account with that email exists, an OTP has been sent."
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).json(genericResponse)
        }

        const otp = generateOtp()
        user.resetPasswordOtp = hashOtp(otp)
        user.resetPasswordOtpExpires = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)
        await user.save()

        console.log(`[forgotPassword] OTP for ${email}: ${otp} (expires in ${OTP_EXPIRY_MINUTES} min)`)

        const response = { ...genericResponse }
        if (process.env.NODE_ENV !== "production") {
            response.otp = otp
        }
        return res.status(200).json(response)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    try {
        const { error } = validateVerifyOtp.validate({ email, otp })
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const user = await userModel
            .findOne({ email })
            .select("+resetPasswordOtp +resetPasswordOtpExpires")

        if (
            !user ||
            !user.resetPasswordOtp ||
            !user.resetPasswordOtpExpires ||
            user.resetPasswordOtpExpires.getTime() < Date.now() ||
            hashOtp(otp) !== user.resetPasswordOtp
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP" })
        }

        return res.status(200).json({
            message: "OTP verified. You may now reset your password."
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body
    try {
        const { error } = validateResetPassword.validate({ email, otp, newPassword })
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const user = await userModel
            .findOne({ email })
            .select("+resetPasswordOtp +resetPasswordOtpExpires +password")

        if (
            !user ||
            !user.resetPasswordOtp ||
            !user.resetPasswordOtpExpires ||
            user.resetPasswordOtpExpires.getTime() < Date.now() ||
            hashOtp(otp) !== user.resetPasswordOtp
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP" })
        }

        const samePassword = await bcrypt.compare(newPassword, user.password)
        if (samePassword) {
            return res.status(400).json({
                message: "New password must be different from your current password."
            })
        }

        user.password = newPassword
        user.resetPasswordOtp = undefined
        user.resetPasswordOtpExpires = undefined
        await user.save()

        res.clearCookie("token")

        return res.status(200).json({
            message: "Password reset successfully. Please login with your new password."
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        return res.status(200).json({
            data: formatUser(user)
        });
    } catch (err) {
        return res.status(401).json({ message: "Not authenticated" });
    }
};

export const deleteProfile = async (req, res) => {
    const { currentPassword } = req.body
    try {
        const { error } = validateDeleteAccount.validate({ currentPassword })
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const user = await userModel.findById(req.userId).select("+password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password is incorrect." })
        }

        await userModel.findByIdAndDelete(req.userId)

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })

        return res.status(200).json({
            message: "Profile deleted successfully."
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { username, email, bio, role, location, website, interests } = req.body;
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (email && email !== user.email) {
            const emailTaken = await userModel.findOne({ email, _id: { $ne: user._id } });
            if (emailTaken) {
                return res.status(400).json({ message: "That email is already in use." });
            }
            user.email = email;
        }

        if (username) user.username = username;
        if (bio !== undefined) user.bio = bio;
        if (role) user.role = role;
        if (location !== undefined) user.location = location;
        if (website !== undefined) user.website = website;
        if (interests) user.interests = interests;

        await user.save();

        return res.status(200).json({
            data: formatUser(user)
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body
    try {
        const { error } = validateChangePassword.validate({
            currentPassword,
            newPassword
        })
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const user = await userModel.findById(req.userId).select("+password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Current password is incorrect." })
        }

        const samePassword = await bcrypt.compare(newPassword, user.password)
        if (samePassword) {
            return res.status(400).json({
                message: "New password must be different from your current password."
            })
        }

        user.password = newPassword
        await user.save()

        return res.status(200).json({
            message: "Password updated successfully."
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}