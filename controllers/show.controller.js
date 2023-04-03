const ApiError = require('@/api-error');
const Cinema = require('@/models/cinema.model');
const Language = require('@/models/language.model');
const Movie = require('@/models/movie.model');
const Room = require('@/models/room.model');
const SeatRow = require('@/models/seatrow.model');
const SeatType = require('@/models/seattype.model');
const Show = require('@/models/show.model');
const { startOfDay, endOfDay } = require('date-fns');
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
			const { roomId, cinemaId, movieId, provinceId, date } = req.query;

			if (req.query.group) {
				const result = [];

				const roomWhere = {};
				const cinemaWhere = {};
				const dateWhere = {};

				if (cinemaId) {
					roomWhere.cinemaId = cinemaId;
				}

				if (provinceId) {
					cinemaWhere.provinceId = provinceId;
				}

				if (date) {
					dateWhere[Op.and] = [
						{
							startAt: {
								[Op.gte]: new Date(),
							},
						},
						{
							startAt: {
								[Op.gte]: startOfDay(new Date(date)),
							},
						},
						{
							startAt: {
								[Op.lte]: endOfDay(new Date(date)),
							},
						},
					];
				}

				const cinemas = await Show.findAll({
					where: {
						movieId,
					},
					include: [
						{
							model: Room,
							where: roomWhere,
							include: [{ model: Cinema, where: cinemaWhere }],
						},
					],
					group: ['room.cinema.id'],
				});

				const langs = await Show.findAll({
					where: { movieId },
					group: ['languageId'],
					include: [{ model: Language }],
				});

				for (const cine of cinemas) {
					const cinema = cine.room.cinema;
					for (const lang of langs) {
						const { language } = lang;
						const shows = await Show.findAll({
							where: {
								movieId,
								languageId: language.id,
								...dateWhere,
							},
							include: [
								{
									model: Room,
									where: { cinemaId: cinema.id },
								},
							],
						});

						if (!shows.length) continue;

						result.push({
							cinema,
							language: language,
							shows,
						});
					}
				}

				return res.send(result);
			}

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
						include: [{ model: Cinema }],
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
					{ model: Room, include: [{ model: Cinema }] },
					{ model: Movie },
				],
				where: { id: req.params.id },
			});

			res.send(show.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
	/**
	 * @type {import('express').RequestHandler}
	 */
	async getSeats(req, res, next) {
		try {
			const showDetails = await Show.findOne({
				where: { id: req.params.id },
			});

			if (!showDetails) {
				return next(
					new ApiError({
						statusCode: 404,
						message: 'Không tìm thấy suất chiếu',
					})
				);
			}

			const day = new Date(showDetails.dataValues.startAt).getDay();

			const rows = await SeatRow.findAll({
				where: { roomId: showDetails.dataValues.roomId },
				include: [{ model: SeatType }],
			});

			const seats = [];

			for (const row of rows) {
				const _seats = [];

				for (let i = 1; i <= row.quantity; i++) {
					_seats.push({ id: i, booked: false });
				}

				seats.push({
					label: row.label,
					type: row.seattype,
					seats: _seats,
					id: row.id,
					price: row.seattype[`price${day}`],
				});
			}

			res.send(seats);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new ShowController();
