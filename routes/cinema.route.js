const cinemaController = require('@/controllers/cinema.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, cinemaController.create)
	.get(cinemaController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, cinemaController.update)
	.delete(authMiddleware, adminMiddleware, cinemaController.delete)
	.get(authMiddleware, adminMiddleware, cinemaController.getById);

module.exports = router;
