const accountController = require('@/controllers/account.controller');
const { Router } = require('express');

const router = Router();

router.route('/').get(accountController.getAll);

router
	.route('/:id')
	.get(accountController.getById)
	.put(accountController.update)
	.delete(accountController.deleteById);

module.exports = router;
