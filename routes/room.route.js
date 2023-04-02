const roomController = require('@/controllers/room.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, adminMiddleware, roomController.create)
	.get(roomController.getAll);

router
	.route('/:id')
	.put(authMiddleware, adminMiddleware, roomController.update)
	.delete(authMiddleware, adminMiddleware, roomController.delete)
	.get(authMiddleware, adminMiddleware, roomController.getById);

module.exports = router;
