const bannerController = require('@/controllers/banner.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, bannerController.create)
	.get(authMiddleware, adminMiddleware, bannerController.getAll);

router.route('/public').get(bannerController.getAllPublic);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, bannerController.update)
	.delete(authMiddleware, adminMiddleware, bannerController.delete)
	.get(authMiddleware, adminMiddleware, bannerController.getById);

module.exports = router;
