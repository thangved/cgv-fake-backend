const seattypeController = require('@/controllers/seattype.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, seattypeController.create)
	.get(seattypeController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, seattypeController.update)
	.delete(authMiddleware, adminMiddleware, seattypeController.delete)
	.get(authMiddleware, adminMiddleware, seattypeController.getById);

module.exports = router;
