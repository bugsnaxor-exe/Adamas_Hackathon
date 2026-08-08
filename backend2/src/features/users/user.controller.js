const User = require("./user.model");
const jwt = require("jsonwebtoken");
const catchAsync = require("../../middlewares/errorHandler");

//generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: "30d",
    });
};

//REGISTER ACCOUNT
exports.registerUser = catchAsync(async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
        return res.status(400).json({
            message: "User with this email or phone already exists",
        });
    }

    const user = await User.create({ name, email, phone, password });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
    });
});

//EMAIL LOGIN
exports.loginWithEmail = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

//REQUEST OTP (For Phone Login)
exports.requestOtp = catchAsync(async (req, res) => {
    const { phone } = req.body;
    const user = await User.findOne({ phone });

    if (!user) {
        return res
            .status(404)
            .json({ message: "No account found with this phone number" });
    }

    // Generate Mock OTP (In production, use Twilio/AWS SNS)
    const otp = "123456";
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 mins
    await user.save();

    res.json({ message: "OTP sent successfully (Mock OTP is 123456)" });
});

//VERIFY OTP & LOGIN
exports.loginWithPhone = catchAsync(async (req, res) => {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP after successful login
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
    });
});

//FORGOT PASSWORD
exports.forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "Email not found" });
    }

    // In production: Generate a reset token and send via NodeMailer
    res.json({ message: `Password reset link sent to ${email}` });
});
