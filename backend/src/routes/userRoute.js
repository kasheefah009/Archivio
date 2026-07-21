import { Router } from "express"
import {
    registerUser,
    loginUser,
    getProfile,
    forgotPassword,
    resetPassword,
    verifyOtp,
    getMe,
    logoutUser,
    deleteProfile,
    updateProfile,
    changePassword
} from "../controllers/userController.js"
import { checkToken } from "../middleware/userMiddleware.js"

const userRoute = Router()
userRoute.post("/signup", registerUser)
userRoute.post("/login", loginUser)
userRoute.post("/logout", logoutUser);
userRoute.get("/profile/me", checkToken, getProfile)
userRoute.get("/me", checkToken, getMe);
userRoute.post("/forgot-password", forgotPassword)
userRoute.post("/verify-otp", verifyOtp)
userRoute.post("/reset-password", resetPassword)
userRoute.delete("/profile/delete", checkToken, deleteProfile)
userRoute.put("/profile", checkToken, updateProfile)
userRoute.put("/profile/password", checkToken, changePassword)

export default userRoute;
