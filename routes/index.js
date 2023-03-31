const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.route'));

router.use(
	'/accounts',
	authMiddleware,
	adminMiddleware,
	require('./account.route')
);

router.use('/genders', require('./gender.route'));
router.use('/banners', require('./banner.route'));
router.use('/countries', require('./country.route'));
router.use('/categories', require('./category.route'));
router.use('/movies', require('./movie.route'));

module.exports = router;
