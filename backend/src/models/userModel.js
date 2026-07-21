import mongoose from "mongoose"
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 65
    },
    resetPasswordOtp: {
        type: String,
        select: false
    },
    resetPasswordOtpExpires: {
        type: Date,
        select: false
    },
    bio: {
        type: String,
        maxLength: 160
    },
    role: {
        type: String
    },
    location: {
        type: String
    },
    website: {
        type: String
    },
    interests: {
        type: [String],
        default: []
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
export const userModel = mongoose.model("users", userSchema)