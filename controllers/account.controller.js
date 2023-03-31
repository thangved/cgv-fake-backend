const ApiError = require('@/api-error');
const Account = require('@/models/account.model');
const Gender = require('@/models/gender.model');

class AccountController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const accounts = await Account.findAll({
				include: [{ model: Gender }],
			});

			res.send(accounts);
		} catch (error) {
			next(new ApiError());
		}
	}
<<<<<<< Updated upstream
=======

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getById(req, res, next) {
		try {
			const account = await Account.findOne({
				include: [{ model: Gender }],
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
			const isAdmin = await Account.findOne({
				where: { id: req.params.id, admin: true },
			});

			if (isAdmin) {
				return next(
					new ApiError({
						statusCode: 403,
						message: 'Không thể xóa tài khoản quản trị',
					})
				);
			}

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
>>>>>>> Stashed changes
}

module.exports = new AccountController();
