const categoryController = require('@/controllers/category.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, categoryController.create)
	.get(categoryController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, categoryController.update)
	.delete(authMiddleware, adminMiddleware, categoryController.delete)
	.get(authMiddleware, adminMiddleware, categoryController.getById);

module.exports = router;
