const express = require('express');
const router = express.Router();
const {postLogin} = require('../controller/AuthController');
const {getDashboard} = require('../controller/DataController');
const {authenticateToken} = require('../middleware/Authentication');


router.post('/login',postLogin);
router.get('/dashboard',authenticateToken,getDashboard);
module.exports = router;