const ApiError = require('@/api-error');
const Language = require('@/models/language.model');
const Movie = require('@/models/movie.model');
const Room = require('@/models/room.model');
const Show = require('@/models/show.model');
const { Op } = require('sequelize');

const checkConflict = async (payload) => {
	const { roomId, startAt, endAt } = payload;

	return !!(await Show.findOne({
		where: {
			roomId,
			[Op.or]: [
				{
					[Op.and]: [
						{
							startAt: {
								[Op.lte]: startAt,
							},
							endAt: {
								[Op.gt]: startAt,
							},
						},
					],
				},
				{
					[Op.and]: [
						{
							startAt: {
								[Op.lt]: endAt,
							},
							endAt: {
								[Op.gte]: endAt,
							},
						},
					],
				},
			],
		},
	}));
};

class ShowController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const conflict = await checkConflict(req.body);

			if (conflict) {
				return next(
					new ApiError({
						statusCode: 400,
						message:
							'Phòng này đã có suất chiếu trong thời gian mà bạn đã chọn',
					})
				);
			}

			const newShow = await Show.create(req.body);

			res.send(newShow.dataValues);
		} catch (error) {
			console.log(error);
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const where = {};
			const roomWhere = {};
			const cinemaId = req.query.cinemaId;
			const movieId = req.query.movieId;
			const roomId = req.query.roomId;

			if (movieId) {
				where.movieId = movieId;
			}

			if (roomId) {
				where.roomId = roomId;
			}

			if (cinemaId) {
				roomWhere.cinemaId = cinemaId;
			}

			const shows = await Show.findAll({
				include: [
					{ model: Language },
					{
						model: Room,
						where: roomWhere,
					},
					{ model: Movie },
				],
				where,
			});

			res.send(shows);
		} catch (error) {
			console.log(error);
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
				include: [
					{ model: Language },
					{ model: Room },
					{ model: Movie },
				],
				where: { id: req.params.id },
			});

			res.send(show.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new ShowController();
