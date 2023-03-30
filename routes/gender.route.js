const genderController = require('@/controllers/gender.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, genderController.create)
	.get(genderController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, genderController.update)
	.delete(authMiddleware, adminMiddleware, genderController.delete)
	.get(authMiddleware, adminMiddleware, genderController.getById);

module.exports = router;
