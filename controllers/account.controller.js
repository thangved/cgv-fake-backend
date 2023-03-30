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
}

module.exports = new AccountController();
