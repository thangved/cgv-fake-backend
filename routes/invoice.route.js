const invoiceController = require('@/controllers/invoice.controller');
const adminMiddleware = require('@/middleware/admin.middleware');
const authMiddleware = require('@/middleware/auth.middleware');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.post(authMiddleware, invoiceController.create)
	.get(authMiddleware, invoiceController.getAll);

router
	.route('/:id')
	.delete(authMiddleware, adminMiddleware, invoiceController.delete)
	.get(authMiddleware, invoiceController.getById);

module.exports = router;
