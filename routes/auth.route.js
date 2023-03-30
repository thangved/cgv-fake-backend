const authController = require('@/controllers/auth.controller');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.get(authMiddleware, authController.auth)
	.put(authMiddleware, authController.update);

router.route('/login').post(authController.login);

module.exports = router;
