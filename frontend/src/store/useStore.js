import { create } from "zustand"
import { api } from "../api/api"
import { showSuccess, showError } from "../utils/toast"


export const userStore = create((set) => ({
    user: null,
    isLoggedIn: false,


    signup: async ({ username, email, password }) => {
        try {
            const response = await api.post('/signup', {
                username,
                email,
                password
            })

            const data = await response.data

            set({ user: data.data, isLoggedIn: true })

            showSuccess(
                `Hello there, ${data.data.username}!`,
                "Welcome to Archivio, go find a building worth saving."
            )
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Something went wrong";
            showError("Couldn't create your account", message)
            throw new Error(message)
        }
    },

    login: async ({ email, password }) => {
        try {
            const response = await api.post('/login', {
                email,
                password
            })

            const data = await response.data

            set({ user: data.data, isLoggedIn: true })

            showSuccess(
                `Welcome back, ${data.data.username}!`,
                "Good to see you again."
            )
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Something went wrong";
            showError("Couldn't sign you in", message)
            throw new Error(message)
        }
    },

    forgotPassword: async ({ email }) => {
        try {
            const response = await api.post("/forgot-password", {
                email,
            });

            const data = await response.data;

            set({ user: data.data, isLoggedIn: true })
            showSuccess("Check your email", "We've sent a one-time code to reset your password.")
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Something went wrong";
            showError("Couldn't send that code", message)
            throw new Error(message)
        }
    },

    resetPassword: async ({ token, password }) => {
        try {
            const response = await api.post(
                `/reset-password/${token}`,
                {
                    password,
                }
            );

            const data = response.data;

            showSuccess("Password reset", data.message);

            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong";
            showError("Couldn't reset your password", message)
            throw err;
        }
    },

    verifyOtp: async ({ email, otp }) => {
        try {
            const response = await api.post(
                `/verify-otp`,
                {
                    email,
                    otp
                }
            );

            const data = await response.data;

            set({ user: data.data, isLoggedIn: true })
            showSuccess("Verified", "You're all set.")
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Something went wrong";
            showError("That code didn't work", message)
            throw new Error(message)
        }
    },

    resendOtp: async ({ email }) => {
        try {
            const response = await api.post(
                `/resend-otp`,
                {
                    email,
                }
            );

            const data = await response.data;

            set({ user: data.data, isLoggedIn: true })
            showSuccess("Code sent", "Check your email for the new code.")
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Something went wrong";
            showError("Couldn't resend that code", message)
            throw new Error(message)
        }
    },

    checkAuth: async () => {
        try {
            const response = await api.get("/me");
            set({ user: response.data.data, isLoggedIn: true });
        } catch (err) {
            if (err.response?.status === 401) {
                set({ user: null, isLoggedIn: false });
            }
        }
    },


    updateProfile: async (formData) => {
        try {
            const response = await api.put("/profile", formData);
            set({ user: response.data.data });
            showSuccess("Profile updated", "Your changes are saved.")
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to update profile";
            showError("Couldn't update your profile", message);
            throw new Error(message);
        }
    },

    changePassword: async ({ currentPassword, newPassword }) => {
        try {
            const response = await api.put("/profile/password", {
                currentPassword,
                newPassword,
            });
            showSuccess("Password updated", "Use your new password next time you log in.");
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || "Current password is incorrect";
            showError("Couldn't update your password", message);
            throw new Error(message);
        }
    },

    deleteProfile: async ({ currentPassword }) => {
        try {
            await api.delete("/profile/delete", { data: { currentPassword } });
            set({ user: null, isLoggedIn: false });
            showSuccess("Account deleted", "Sorry to see you go.");
        } catch (err) {
            const message = err.response?.data?.message || "Failed to delete profile";
            showError("Couldn't delete your account", message);
            throw new Error(message);
        }
    },


    logOut: async () => {
        try {
            await api.post("/logout");
            showSuccess("Logged out", "See you again soon.");
        } catch (err) {
            console.error(err);
        } finally {
            set({ user: null, isLoggedIn: false });
        }
    }

}))