const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/authConfig'); // Import your JWT secret key from the configuration file

// Middleware function to verify user authentication
const authenticateUser = (req, res, next) => {
    // Get the token from the request headers or cookies, however you're sending it
    const token = req.header('x-auth-token'); // Example header-based token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    try {
        // Verify and decode the token using your secret key
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach the user data to the request for later use
        req.user = decoded.user;

        // Continue to the next middleware or route
        next();
    } catch (error) {
        // Handle token verification errors
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
};

module.exports = { authenticateUser };
