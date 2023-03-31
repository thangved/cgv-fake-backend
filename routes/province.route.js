const provinceController = require('@/controllers/province.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, provinceController.create)
	.get(genderController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, provinceController.update)
	.delete(authMiddleware, adminMiddleware, provinceController.delete)
	.get(authMiddleware, adminMiddleware, provinceController.getById);

module.exports = router;
