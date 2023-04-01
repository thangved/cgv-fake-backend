const languageController = require('@/controllers/language.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, languageController.create)
	.get(languageController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, languageController.update)
	.delete(authMiddleware, adminMiddleware, languageController.delete)
	.get(authMiddleware, adminMiddleware, languageController.getById);

module.exports = router;
