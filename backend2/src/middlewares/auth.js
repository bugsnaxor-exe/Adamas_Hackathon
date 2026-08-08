const jwt = require('jsonwebtoken');
const User = require('../features/users/user.model'); 

const protect = async (req, res, next) => {
  let token;

  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Decrypt the token to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

      // Find the user in the DB and attach it to the request object (req.user)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move on to the actual controller function
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };