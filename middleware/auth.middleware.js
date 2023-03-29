const ApiError = require('@/api-error');
const Account = require('@/models/account.model');
const Gender = require('@/models/gender.model');
const jwt = require('@/utils/jwt.utils');

/**
 * @type {import('express').RequestHandler}
 */
async function authMiddleware(req, res, next) {
	try {
		const accessToken = req.headers.authorization?.split(' ')[1];

		if (!accessToken) {
			return next(
				new ApiError({ statusCode: 401, message: 'Token không hợp lệ' })
			);
		}

		const userDecode = jwt.decode(accessToken);

		if (!userDecode) {
			return next(
				new ApiError({ statusCode: 401, message: 'Token không hợp lệ' })
			);
		}

		const currentUser = await Account.findOne({
			where: { email: userDecode.email },
			include: [
				{
					model: Gender,
				},
			],
		});

		if (!currentUser) {
			return next(
				new ApiError({
					statusCode: 401,
					message: 'Token không hợp lệ',
				})
			);
		}

		req.currentUser = currentUser;

		next();
	} catch (error) {
		console.log(error);
		next(new ApiError());
	}
}

module.exports = authMiddleware;
