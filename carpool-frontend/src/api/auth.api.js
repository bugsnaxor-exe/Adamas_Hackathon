import axiosClient from "./axiosClient";

export const authAPI = {
    // POST: /api/users/register (Register a new user)
    register: (data) => axiosClient.post("/users/register", data),

    // POST: /api/users/login/email (Login using email and password)
    loginEmail: (data) => axiosClient.post("/users/login/email", data),

    // POST: /api/users/login/forgot-password (Request a password reset link/OTP)
    forgotPassword: (data) =>
        axiosClient.post("/users/login/forgot-password", data),

    // POST: /api/users/login/reset-password (Submit the new password with token/OTP)
    resetPassword: (data) =>
        axiosClient.post("/users/login/reset-password", data),

    // PUT: /api/users/profile (Update authenticated user's profile details)
    updateProfile: (data) => axiosClient.put("/users/profile", data),
};
