const ApiError = require('@/api-error');
const Cinema = require('@/models/cinema.model');
const Province = require('@/models/province.model');

class CinemaController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const newCinema = await Cinema.create(req.body);

			res.send(newCinema.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const cinemas = await Cinema.findAll({
				include: [{ model: Province }],
			});

			res.send(cinemas);
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

			await Cinema.update(req.body, {
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
			await Cinema.destroy({
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
			const cinema = await Cinema.findOne({
				include: [{ model: Province }],
				where: { id: req.params.id },
			});

			res.send(cinema.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new CinemaController();
