const bcrypt = require('bcrypt');
const User = require('../models/user');

// User registration
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User login
exports.loginUser = (req, res) => {
    res.status(200).json({ message: 'Login successful', user: req.user });
};

// User logout
exports.logoutUser = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logout successful' });
};
