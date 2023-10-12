const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/authConfig');

// Middleware function to verify user authentication
const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth-token'); // Move this line here

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
};

module.exports = { authenticateUser };
