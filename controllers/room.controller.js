const ApiError = require('@/api-error');
const Room = require('@/models/room.model');
const Cinema = require('@/models/cinema.model');

class RoomController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const newRoom = await Room.create(req.body);

			res.send(newRoom.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const rooms = await Room.findAll({
                include: [{ model: Cinema }],
            });

			res.send(rooms);
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

			await Room.update(req.body, {
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
			await Room.destroy({
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
			const room = await Room.findOne({
                include: [{ model: Cinema }],
				where: { id: req.params.id },
			});

			res.send(room.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new RoomController();
