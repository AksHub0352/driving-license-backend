const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const authenticateUser = require('../middleware');

router.post('/signup', authController.registerUser);


router.post('/login', authController.loginUser);

router.get('/verify/:token', authController.verifyEmail);


router.get('/protected', authenticateUser, (req, res) => {
    res.json({ message: 'You have access to this protected route!' });
});

module.exports = router;