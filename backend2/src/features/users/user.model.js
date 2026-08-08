const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Make sure this is imported at the top!

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["Employee", "Admin"],
            default: "Employee",
        },
        otp: { type: String },
        otpExpires: { type: Date },
        phone: { type: String, required: true, trim: true },
        wallet: { type: Number, default: 0 },
        savedPlaces: [
            {
                label: { type: String },
                lat: { type: String },
                lng: { type: String },
                address: { type: String },
            },
        ],
    },
    { timestamps: true },
);

userSchema.pre("save", async function () {
    // 1. If the password wasn't modified, skip hashing
    if (!this.isModified("password")) {
        return;
    }

    // 2. Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
