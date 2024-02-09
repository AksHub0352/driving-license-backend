const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const authenticateUser = require('../middleware');
const { checkResult } = require('../controller/result');

router.post('/', authenticateUser, checkResult);

module.exports = router;