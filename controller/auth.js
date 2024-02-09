const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendVerificationEmail } = require('../utils/sendEmail');




const registerUser = async (req, res) => {
    const { email, password, firstName, lastName, phoneNumber, address } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const verificationToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '15m' });
        user = new User({ email, password, firstName, lastName, phoneNumber, address, verificationToken });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        await sendVerificationEmail(user.email, verificationToken);
        res.json({ success: true, message: "User created successfully. Please check your email for verification." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


const verifyEmail = async (req, res) => {
    const token = req.params.token;
    if (!token) {
        return res.status(404).json({ success: false, message: 'No invalid url' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.isVerified = true;
        await user.save();

        res.json({ success: true, message: 'Email verification successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Invalid token or token expired' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ success: false, message: 'Email not verified. Please verify your email to login.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const tokenPayload = { userId: user.email };
        const token = jwt.sign(tokenPayload, process.env.JWT_LOGIN_SECRET, { expiresIn: '30d' });

        res.json({ success: true, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



module.exports = { registerUser, loginUser, verifyEmail };
