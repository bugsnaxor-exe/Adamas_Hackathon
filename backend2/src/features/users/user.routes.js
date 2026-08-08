const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth");

const {
    registerUser,
    loginWithEmail,
    // requestOtp,
    // loginWithPhone,
    forgotPassword,
    resetPassword,
    updateProfile,
} = require("./user.controller");

const { validateRequest } = require("../../middlewares/validateRequest");
const {
    registerValidationSchema,
    loginWithEmailSchema,
    // requestOtpSchema,
    // loginWithPhoneSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateProfileSchema,
} = require("./user.validation");

router.post(
    "/register",
    validateRequest(registerValidationSchema),
    registerUser,
);
router.post(
    "/login/email",
    validateRequest(loginWithEmailSchema),
    loginWithEmail,
);
// router.post(
//     "/login/phone/request-otp",
//     validateRequest(requestOtpSchema),
//     requestOtp,
// );
// router.post(
//     "/login/phone/verify",
//     validateRequest(loginWithPhoneSchema),
//     loginWithPhone,
// );
router.post(
    "/login/forgot-password",
    validateRequest(forgotPasswordSchema),
    forgotPassword,
);
router.post(
    "/login/reset-password",
    validateRequest(resetPasswordSchema),
    resetPassword,
);
router.put(
    "/profile",
    protect,
    validateRequest(updateProfileSchema),
    updateProfile,
);

module.exports = router;
