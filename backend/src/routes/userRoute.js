import { Router } from "express"
import {
    getHomePage,
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
import { upload } from "../middleware/upload.js"

const userRoute = Router()
userRoute.get("/", getHomePage)
userRoute.post("/signup", registerUser)
userRoute.post("/login", loginUser)
userRoute.post("/logout", logoutUser);
userRoute.get("/profile/me", checkToken, getProfile)
userRoute.get("/me", checkToken, getMe);
userRoute.post("/forgot-password", forgotPassword)
userRoute.post("/verify-otp", verifyOtp)
userRoute.post("/reset-password", resetPassword)
userRoute.delete("/profile/delete", checkToken, deleteProfile)
userRoute.put("/profile", checkToken, upload.single("avatar"), updateProfile)
userRoute.put("/profile/password", checkToken, changePassword)

export default userRoute;
