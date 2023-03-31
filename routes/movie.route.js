const movieController = require('@/controllers/movie.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, movieController.create)
	.get(movieController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, movieController.update)
	.delete(authMiddleware, adminMiddleware, movieController.delete)
	.get(movieController.getByIdOrSlug);

module.exports = router;
