const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/authConfig'); // Import your secret key from the configuration file
const { User } = require('../models/user');
const { authenticateUser } = require('../middleware/authMiddleware');

// Route for user registration
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();

        // Generate a JSON Web Token (JWT) for the newly registered user
        const token = jwt.sign({ user: { id: user._id } }, SECRET_KEY);

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT for the authenticated user
        const token = jwt.sign({ user: { id: user._id } }, SECRET_KEY);

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for user logout (optional)
router.post('/logout', authenticateUser, (req, res) => {
    // You can implement logout functionality here, such as blacklisting the token.
    res.json({ message: 'Logout successful' });
});

module.exports = router;
