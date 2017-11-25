
const express = require('express');
const User = require('../controllers/user/user');

const router = express.Router();

router.get('/user/signin',User.signin);

export default router;