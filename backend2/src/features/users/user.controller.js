const User = require("./user.model");
const jwt = require("jsonwebtoken");
const catchAsync = require("../../middlewares/errorHandler");
const crypto = require("crypto");
const sendEmail = require("../../utils/emailHelper");
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
// exports.requestOtp = catchAsync(async (req, res) => {
//     const { phone } = req.body;
//     const user = await User.findOne({ phone });

//     if (!user) {
//         return res
//             .status(404)
//             .json({ message: "No account found with this phone number" });
//     }

//     // Generate Mock OTP (In production, use Twilio/AWS SNS)
//     const otp = "123456";
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 mins
//     await user.save();

//     res.json({ message: "OTP sent successfully (Mock OTP is 123456)" });
// });

// //VERIFY OTP & LOGIN
// exports.loginWithPhone = catchAsync(async (req, res) => {
//     const { phone, otp } = req.body;
//     const user = await User.findOne({ phone });

//     if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
//         return res.status(401).json({ message: "Invalid or expired OTP" });
//     }

//     // Clear OTP after successful login
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();

//     res.json({
//         _id: user._id,
//         name: user.name,
//         token: generateToken(user._id),
//     });
// });

//FORGOT PASSWORD
exports.forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(404)
            .json({ message: "No account found with that email" });
    }

    // 1. Generate a secure 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 2. Attach OTP to the user and set a 10-minute expiration
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    try {
        // 3. Send the actual email
        const subject = "Password Reset OTP - Carpool App";
        const message = `You requested a password reset. \n\nYour OTP is: ${otp}\n\nThis OTP is valid for 10 minutes. Do not share it with anyone.`;

        await sendEmail(user.email, subject, message);

        res.status(200).json({
            message: "Password reset OTP sent to your email",
        });
    } catch (error) {
        // If the email fails to send, clear the OTP to prevent database clutter/locks
        console.log("NODEMAILER ERROR:", error);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res
            .status(500)
            .json({ message: "Failed to send email. Please try again." });
    }
});

exports.resetPassword = catchAsync(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });

    // 2. Validate the OTP and check expiration
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    // 3. Update the password
    // NOTE: Because you set up the userSchema.pre('save') middleware earlier,
    // Mongoose will automatically intercept this and encrypt 'newPassword' before saving!
    user.password = newPassword;

    // 4. Clear the OTP so it cannot be used again
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
        message: "Password has been reset successfully. You can now log in.",
    });
});

// UPDATE PROFILE
exports.updateProfile = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: req.body },
        {
            new: true,
            runValidators: true,
        },
    ).select("-password -otp -otpExpires"); // Security: Never return hashed passwords or OTPs in the response

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
    });
});
