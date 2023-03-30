const ApiError = require('@/api-error');

/**
 * @type {import('express').RequestHandler}
 */
const adminMiddleware = async (req, res, next) => {
	try {
		const isAdmin = req.currentUser.admin;

		if (!isAdmin) {
			return next(
				new ApiError({ statusCode: 403, message: 'Không đủ quyền' })
			);
		}

		next();
	} catch (error) {
		next(new ApiError());
	}
};

module.exports = adminMiddleware;
