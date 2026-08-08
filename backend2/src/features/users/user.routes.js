const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth");

const {
    registerUser,
    loginWithEmail,
    requestOtp,
    loginWithPhone,
    forgotPassword,
} = require("./user.controller");

const { validateRequest } = require("../../middlewares/validateRequest");
const {
    registerValidationSchema,
    loginWithEmailSchema,
    requestOtpSchema,
    loginWithPhoneSchema,
    forgotPasswordSchema,
    updateProfileSchema,
} = require("./user.validation");

router.post(
    "/register",
    protect,
    validateRequest(registerValidationSchema),
    registerUser,
);
router.post(
    "/login/email",
    protect,
    validateRequest(loginWithEmailSchema),
    loginWithEmail,
);
router.post(
    "/login/phone/request-otp",
    protect,
    validateRequest(requestOtpSchema),
    requestOtp,
);
router.post(
    "/login/phone/verify",
    protect,
    validateRequest(loginWithPhoneSchema),
    loginWithPhone,
);
router.post(
    "/login/forgot-password",
    protect,
    validateRequest(forgotPasswordSchema),
    forgotPassword,
);
router.put(
    "/profile",
    protect,
    validateRequest(updateProfileSchema),
    updateProfile,
);

module.exports = router;
