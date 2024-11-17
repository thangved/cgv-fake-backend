class FileController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async upload(req, res, next) {
		try {
			const filename = `/api/static/uploads/${req.file.filename}`;
			res.status(200).json({
				filename,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new FileController();
