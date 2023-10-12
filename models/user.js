const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

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
        select: false, // Prevents password from being selected by default
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

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
