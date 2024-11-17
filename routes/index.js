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
router.use('/cinemas', require('./cinema.route'));
router.use('/languages', require('./language.route'));
router.use('/provinces', require('./province.route'));
router.use('/rooms', require('./room.route'));
router.use('/seat-rows', require('./seatrow.route'));
router.use('/seat-types', require('./seattype.route'));
router.use('/shows', require('./show.route'));
router.use('/invoices', require('./invoice.route'));
router.use('/dash', authMiddleware, adminMiddleware, require('./dash.route'));
router.use('/files', authMiddleware, require('./file.route'));

module.exports = router;
