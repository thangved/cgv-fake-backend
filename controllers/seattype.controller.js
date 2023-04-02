const ApiError = require('@/api-error');
const SeatType = require('@/models/seattype.model');

class SeatTypeController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const seatType = await SeatType.create(req.body);

			res.send(seatType.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const seatTypes = await SeatType.findAll();

			res.send(seatTypes);
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

			await SeatType.update(req.body, {
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
			await SeatType.destroy({
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
			const seatType = await SeatType.findOne({
				where: { id: req.params.id },
			});

			res.send(seatType.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new SeatTypeController();
