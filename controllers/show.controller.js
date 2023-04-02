const ApiError = require('@/api-error');
const Language = require('@/models/language.model');
const Movie = require('@/models/movie.model');
const Room = require('@/models/room.model');
const Show = require('@/models/show.model');

class ShowController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const newShow = await Show.create(req.body);

			res.send(newShow.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const shows = await Show.findAll({
				include: [{ model: Language }],
				include: [{ model: Room }],
				include: [{ model: Movie }],
			});

			res.send(shows);
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

			await Show.update(req.body, {
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
			await Show.destroy({
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
			const show = await Show.findOne({
				include: [{ model: Language }],
				include: [{ model: Room }],
				include: [{ model: Movie }],
				where: { id: req.params.id },
			});

			res.send(show.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new ShowController();
