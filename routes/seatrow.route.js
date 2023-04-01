const seatrowController = require('@/controllers/seatrow.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');



const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, seatrowController.create)
	.get(seatrowController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, seatrowController.update)
	.delete(authMiddleware, adminMiddleware, seatrowController.delete)
	.get(authMiddleware, adminMiddleware, seatrowController.getById);

module.exports = router;
