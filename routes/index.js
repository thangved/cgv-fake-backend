const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth.route'));

router.use(
	'/accounts',
	authMiddleware,
	adminMiddleware,
	require('./account.route')
);

router.use('/genders', require('./gender.route'));

module.exports = router;
