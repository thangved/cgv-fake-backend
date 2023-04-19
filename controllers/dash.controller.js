const ApiError = require('@/api-error');
const Account = require('@/models/account.model');
const Cinema = require('@/models/cinema.model');
const Invoice = require('@/models/invoice.model');
const Province = require('@/models/province.model');
const Room = require('@/models/room.model');
const Show = require('@/models/show.model');
const Ticket = require('@/models/ticket.model');
const sequelize = require('@/services/sequelize.service');

class DashController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async dash(req, res, next) {
		try {
			const revenue = await Ticket.sum('price');
			const numTicket = await Ticket.count();
			const numInvoice = await Invoice.count();
			const numCustomer = await Account.count();
			const numCinema = await Cinema.count();
			const numRoom = await Room.count();

			const tickets = await Ticket.findAll({
				attributes: [
					[sequelize.fn('sum', sequelize.col('price')), 'total'],
					[sequelize.fn('count', sequelize.col('*')), 'numTicket'],
					'*',
				],
				include: [
					{
						model: Show,
						include: [
							{
								model: Room,
								include: [
									{
										model: Cinema,
										include: [{ model: Province }],
									},
								],
							},
						],
					},
				],
				group: ['show.room.cinema.id'],
				order: [[sequelize.col('total'), 'desc']],
			});

			const cinemas = tickets.map((e) => {
				e = e.dataValues;

				e.cinema = e.show.room.cinema;

				delete e.show;

				return e;
			});

			res.send({
				revenue,
				numTicket,
				numInvoice,
				numCustomer,
				numCinema,
				numRoom,
				cinemas,
			});
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new DashController();
