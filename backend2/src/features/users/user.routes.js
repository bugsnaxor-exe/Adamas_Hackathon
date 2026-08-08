const express = require("express");
const router = express.Router();
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
    validateRequest(registerValidationSchema),
    registerUser,
);
router.post(
    "/login/email",
    validateRequest(loginWithEmailSchema),
    loginWithEmail,
);
router.post(
    "/login/phone/request-otp",
    validateRequest(requestOtpSchema),
    requestOtp,
);
router.post(
    "/login/phone/verify",
    validateRequest(loginWithPhoneSchema),
    loginWithPhone,
);
router.post(
    "/login/forgot-password",
    validateRequest(forgotPasswordSchema),
    forgotPassword,
);
router.put("/profile", validateRequest(updateProfileSchema), updateProfile);

module.exports = router;
