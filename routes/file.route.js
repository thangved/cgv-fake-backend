const fileController = require('@/controllers/file.controller');
const { Router } = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: path.resolve(process.env.UPLOAD_DIR),
});

const router = Router();

router
	.route('/')
	.post(
		multer({ storage }).single('file'),
		fileController.upload.bind(fileController)
	);

module.exports = router;
