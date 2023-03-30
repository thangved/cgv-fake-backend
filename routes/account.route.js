const accountController = require('@/controllers/account.controller');
const { Router } = require('express');

const router = Router();

router.route('/').get(accountController.getAll);

module.exports = router;
