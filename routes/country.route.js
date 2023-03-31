const countryController = require('@/controllers/country.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, countryController.create)
	.get(countryController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, countryController.update)
	.delete(authMiddleware, adminMiddleware, countryController.delete)
	.get(authMiddleware, adminMiddleware, countryController.getById);

module.exports = router;
