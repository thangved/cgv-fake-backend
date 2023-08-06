const { getAuth } = require('firebase-admin/auth');

const ApiError = require('@/api-error');
const { app } = require('@/firebase');
const Account = require('@/models/account.model');
const jwt = require('@/utils/jwt.utils');
const password = require('@/utils/password.util');

const getUserByEmail = async (email) => {
	const existingUser = (
		await Account.findOne({
			where: { email },
		})
	)?.dataValues;

	return existingUser;
};

class AuthController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async loginWithGoogle(req, res, next) {
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

			const existingUser = await getUserByEmail(result.email);

			if (!existingUser) {
				return res.status(404).send({
					message: 'Tài khoản không tồn tại, vui lòng tạo tài khoản',
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
	async register(req, res, next) {
		try {
			const { accessToken } = req.body;
			if (!accessToken) {
				return next(
					new ApiError({
						statusCode: 400,
						message: 'Vui lòng cung cấp token',
					})
				);
			}

			const result = await getAuth(app).verifyIdToken(accessToken);

			const existingUser = await getUserByEmail(result.email);

			if (existingUser) {
				return next(
					new ApiError({
						statusCode: 400,
						message:
							'Email này đã được liên kết với một tài khoản khác',
					})
				);
			}

			const newAccount = await Account.create({
				...req.body,
				password: await password.hash(req.body.password),
				email: result.email,
				avatar: result.picture,
			});

			res.status(201).send({
				accessToken: jwt.encode(newAccount.dataValues),
			});
		} catch (error) {
			console.log(error);
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async login(req, res, next) {
		try {
			const { email, password: pass } = req.body;

			const existingUser = await getUserByEmail(email);

			if (!existingUser) {
				return next(
					new ApiError({
						statusCode: 401,
						message: 'Email hoặc mật khẩu không chính xác',
					})
				);
			}

			if (!(await password.verify(existingUser.password, pass))) {
				return next(
					new ApiError({
						statusCode: 401,
						message: 'Email hoặc mật khẩu không chính xác',
					})
				);
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

	/**
	 * @type {import('express').RequestHandler}
	 */
	async update(req, res, next) {
		try {
			const body = req.body;
			delete body.id;
			delete body.email;

			await Account.update(body, {
				where: {
					id: req.currentUser.id,
				},
			});

			res.send({ message: 'Cập nhật tài khoản thành công' });
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new AuthController();
