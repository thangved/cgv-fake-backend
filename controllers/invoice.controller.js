const ApiError = require('@/api-error');
const Account = require('@/models/account.model');
const Cinema = require('@/models/cinema.model');
const Invoice = require('@/models/invoice.model');
const Language = require('@/models/language.model');
const Movie = require('@/models/movie.model');
const Room = require('@/models/room.model');
const SeatRow = require('@/models/seatrow.model');
const SeatType = require('@/models/seattype.model');
const Show = require('@/models/show.model');
const Ticket = require('@/models/ticket.model');
const sequelize = require('@/services/sequelize.service');

class InvoiceController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const { showId, details } = req.body;

			if (!details.length) {
				return next(
					new ApiError({
						statusCode: 400,
						message: 'Vui lòng chọn ít nhất 1 ghế',
					})
				);
			}

			const showDetails = await Show.findOne({ where: { id: showId } });

			const day = new Date(showDetails.dataValues.startAt).getDay() || 7;

			const newInvoice = await Invoice.create(
				{
					customerId: req.currentUser.id,
					date: new Date(),
					code: Date.now(),
				},
				{ transaction: t }
			);

			for (const detail of details) {
				const rowDetails = await SeatRow.findOne({
					where: { id: detail.rowId },
					include: [{ model: SeatType }],
				});

				const price = rowDetails.dataValues.seattype[`price${day}`];

				const existTicket = await Ticket.findOne({
					where: {
						showId,
						rowId: detail.rowId,
						seatId: detail.seatId,
					},
					transaction: t,
				});

				if (existTicket) {
					await t.rollback();
					return next(
						new ApiError({
							statusCode: 400,
							message: 'Đã xảy ra lỗi, vui lòng chọn lại',
						})
					);
				}

				await Ticket.create(
					{
						showId,
						rowId: detail.rowId,
						seatId: detail.seatId,
						price,
						invoiceId: newInvoice.dataValues.id,
					},
					{ transaction: t }
				);
			}

			await t.commit();

			const invoiceDetails = await Invoice.findOne({
				where: {
					id: newInvoice.id,
				},
				include: [{ model: Ticket }],
			});

			res.send(invoiceDetails.dataValues);
		} catch (error) {
			await t.rollback();
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		const { all } = req.query;

		if (all && !req.currentUser.admin) {
			return next(
				new ApiError({
					statusCode: 403,
					message: 'Không đủ thẩm quyền',
				})
			);
		}

		try {
			const where = {};

			if (!all) {
				where.customerId = req.currentUser.id;
			}

			const invoices = await Invoice.findAll({
				where,
				include: [
					{
						model: Ticket,
						include: [
							{
								model: Show,
								include: [
									{ model: Movie },
									{ model: Language },
									{
										model: Room,
										include: [{ model: Cinema }],
									},
								],
							},
							{ model: SeatRow, include: [{ model: SeatType }] },
						],
					},
					{
						model: Account,
					},
				],
				order: [['id', 'DESC']],
			});

			const result = [];

			for (const invoice of invoices) {
				result.push({
					...invoice.dataValues,
					show: invoice.tickets[0].show,
					total: invoice.dataValues.tickets.reduce(
						(prev, current) => prev + current.price,
						0
					),
				});
			}

			res.send(result);
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

			await Invoice.update(req.body, {
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
			await Invoice.destroy({
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
			const where = {};

			if (!req.currentUser.admin) {
				where.customerId = req.currentUser.id;
			}

			const invoice = await Invoice.findOne({
				where: { id: req.params.id, ...where },
				include: [
					{
						model: Ticket,
						include: [
							{
								model: SeatRow,
								include: [{ model: SeatType }],
							},
							{
								model: Show,
								include: [
									{ model: Movie },
									{ model: Language },
									{
										model: Room,
										include: [{ model: Cinema }],
									},
								],
							},
						],
					},
					{
						model: Account,
					},
				],
			});

			res.send({
				...invoice.dataValues,
				show: invoice.dataValues.tickets[0].show,
				total: invoice.dataValues.tickets.reduce(
					(prev, current) => prev + current.price,
					0
				),
			});
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new InvoiceController();
