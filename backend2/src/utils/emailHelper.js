const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    // For a hackathon, Gmail is easiest.
    // You MUST generate an "App Password" in your Google Account Security settings.
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // e.g., yourgmail@gmail.com
            pass: process.env.EMAIL_APP_PASSWORD, // 16-character app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
