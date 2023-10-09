const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true, // Removes leading/trailing spaces
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true, // Store emails in lowercase to avoid case sensitivity issues
    },
    // You can add more fields like name, profile picture, etc. based on your application's requirements.
    // Example:
    // name: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // profilePicture: {
    //   type: String,
    //   default: 'default.jpg', // You can set a default profile picture
    // },
});

module.exports = mongoose.model('User', userSchema);
