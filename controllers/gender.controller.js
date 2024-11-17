const ApiError = require('@/api-error');
const Gender = require('@/models/gender.model');

class GenderController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const newGender = await Gender.create(req.body);

			res.send(newGender.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			let genders = await Gender.findAll();

			if (!genders.length) {
				await Gender.bulkCreate([
					{ name: 'Nam' },
					{ name: 'Nữ' },
					{ name: 'Khác' },
				]);
				genders = await Gender.findAll();
			}

			res.send(genders);
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

			await Gender.update(req.body, {
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
	async delete(req, res, next) {
		try {
			await Gender.destroy({
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
	async getById(req, res, next) {
		try {
			const gender = await Gender.findOne({
				where: { id: req.params.id },
			});

			res.send(gender.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new GenderController();
