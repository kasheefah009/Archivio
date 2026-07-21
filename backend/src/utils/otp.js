import crypto from "crypto"

export const OTP_EXPIRY_MINUTES = 10

export const generateOtp = () => {
    return crypto.randomInt(100000, 1000000).toString()
}

export const hashOtp = (otp) => {
    return crypto.createHash("sha256").update(String(otp)).digest("hex")
}