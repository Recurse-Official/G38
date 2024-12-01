const jwt = require('jsonwebtoken');

// Middleware to authenticate user based on JWT token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');  // Get the token from the request header

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to the request object so that routes can use it
    req.user = decoded.user;
    next();  // Continue to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
