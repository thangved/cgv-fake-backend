const dashController = require('@/controllers/dash.controller');
const { Router } = require('express');

const router = Router();

router.route('/').get(dashController.dash);

module.exports = router;
