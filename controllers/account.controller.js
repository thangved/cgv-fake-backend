const ApiError = require('@/api-error');
const Account = require('@/models/account.model');
const Gender = require('@/models/gender.model');
const password = require('@/utils/password.util');

class AccountController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const newAccount = await Account.create({
				...req.body,
				password: await password.hash(req.body.password),
			});

			res.status(201).send(newAccount.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const accounts = await Account.findAll({
				include: [{ model: Gender }],
				attributes: {
					exclude: ['password'],
				},
			});

			res.send(accounts);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getById(req, res, next) {
		try {
			const account = await Account.findOne({
				where: {
					id: req.params.id,
				},
				attributes: {
					exclude: ['password'],
				},
			});

			if (!account) {
				return next(
					new ApiError({
						statusCode: 404,
						message: 'Không tìm thấy tài khoản',
					})
				);
			}

			res.send(account.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async update(req, res, next) {
		try {
			delete req.body.id;
			delete req.body.password;

			await Account.update(req.body, {
				where: {
					id: req.params.id,
				},
			});

			res.end();
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async deleteById(req, res, next) {
		try {
			await Account.destroy({
				where: {
					id: req.params.id,
					admin: false,
				},
			});

			res.end();
		} catch (error) {
			console.log(error);
			next(new ApiError());
		}
	}
}

module.exports = new AccountController();
