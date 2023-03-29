const { getAuth } = require('firebase-admin/auth');

const ApiError = require('@/api-error');
const { app } = require('@/firebase');
const Account = require('@/models/account.model');
const jwt = require('@/utils/jwt.utils');

async function createNewUser(payload) {
	const newUser = await Account.create(payload);

	return newUser.dataValues;
}

class AuthController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async login(req, res, next) {
		try {
			const { accessToken } = req.body;

			const result = await getAuth(app).verifyIdToken(accessToken);

			if (!result) {
				return next(
					new ApiError({
						statusCode: 400,
						message: 'Token không hợp lệ',
					})
				);
			}

			let existingUser = (
				await Account.findOne({
					where: { email: result.email },
				})
			)?.dataValues;

			if (!existingUser) {
				existingUser = await createNewUser({
					fullName: result.name,
					avatar: result.picture,
					email: result.email,
				});
			}

			res.send({ accessToken: jwt.encode(existingUser) });
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async auth(req, res, next) {
		try {
			res.send(req.currentUser);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new AuthController();
