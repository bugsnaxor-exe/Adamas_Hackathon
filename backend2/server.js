const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'ku-asss'; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

//Database
const users = []; 
const otpStore = {}; // Stores OTPs temporarily: { "phone_number": "otp_code" }

// User Registration
app.post('/api/auth/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const userExists = users.find(u => u.email === email || u.phone === phone);
    if (userExists) {
      return res.status(400).json({ error: 'User with this email or phone already exists.' });
    }

    // Hash the password for security
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password: hashedPassword,
    };
    users.push(newUser);

    // Generate a JWT Token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email}
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// 2. Email Login
app.post('/api/auth/login/email', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find User
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate Token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 3. Request Phone OTP
app.post('/api/auth/otp/request', (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // In a real app, integrate Twilio/AWS SNS here.
  // We'll hardcode '123456' to match your frontend mock, or generate a random one.
  const otp = '123456'; 
  otpStore[phone] = otp;

  // Set OTP to expire in 5 minutes (optional cleanup)
  setTimeout(() => { delete otpStore[phone]; }, 5 * 60 * 1000);

  res.json({ message: `OTP sent successfully to ${phone}` });
});

// 4. Phone Login (Verify OTP)
app.post('/api/auth/login/phone', (req, res) => {
  const { phone, otp } = req.body;

  try {
    // Validate OTP
    if (otpStore[phone] !== otp) {
      return res.status(401).json({ error: 'Invalid or expired OTP' });
    }

    // Find User
    const user = users.find(u => u.phone === phone);
    if (!user) {
      return res.status(404).json({ error: 'No account found with this phone number. Please register.' });
    }

    // Clear OTP after successful use
    delete otpStore[phone];

    // Generate Token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Phone login successful',
      token,
      user: { id: user.id, name: user.name, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during phone login' });
  }
});

// 5. Forgot Password
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    // Standard security practice: Don't reveal if the email exists or not
    return res.json({ message: 'If that email exists, a reset link has been sent.' });
  }

  // Real world logic: Generate a reset token, save to DB, send email via SendGrid/AWS SES
  res.json({ message: 'If that email exists, a reset link has been sent.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});