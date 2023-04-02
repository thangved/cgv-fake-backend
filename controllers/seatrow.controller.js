const ApiError = require('@/api-error');
const Seatrow = require('@/models/seatrow.model');
const Room = require('@/models/room.model');
const SeatType = require('@/models/seattype.model');

class SeatrowController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const newSeatrow = await Seatrow.create(req.body);

			res.send(newSeatrow.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const roomId = req.query.roomId;
			const where = {};

			if (roomId) {
				where.roomId = roomId;
			}

			const seatrows = await Seatrow.findAll({
				include: [{ model: Room }, { model: SeatType }],
				where,
			});

			res.send(seatrows);
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

			await Seatrow.update(req.body, {
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
			await Seatrow.destroy({
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
			const seatrow = await Seatrow.findOne({
				include: [{ model: Room }, { model: SeatType }],
				where: { id: req.params.id },
			});

			res.send(seatrow.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new SeatrowController();
