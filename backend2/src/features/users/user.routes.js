const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginWithEmail, 
  requestOtp, 
  loginWithPhone, 
  forgotPassword 
} = require('./user.controller');

router.post('/register', registerUser);
router.post('/login/email', loginWithEmail);
router.post('/login/phone/request-otp', requestOtp);
router.post('/login/phone/verify', loginWithPhone);
router.post('/forgot-password', forgotPassword);

module.exports = router;