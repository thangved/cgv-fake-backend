const showController = require('@/controllers/show.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, showController.create)
	.get(showController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, showController.update)
	.delete(authMiddleware, adminMiddleware, showController.delete)
	.get(authMiddleware, showController.getById);

router.route('/:id/seats').get(authMiddleware, showController.getSeats);

module.exports = router;
