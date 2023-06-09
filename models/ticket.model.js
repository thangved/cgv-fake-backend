const { DataTypes } = require('sequelize');
const sequelize = require('@/services/sequelize.service');
const Show = require('./show.model');
const SeatRow = require('./seatrow.model');

const Ticket = sequelize.define('ticket', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	seatId: { type: DataTypes.INTEGER, allowNull: false },
	price: { type: DataTypes.BIGINT, allowNull: false },
});

Ticket.belongsTo(Show, {
	foreignKey: 'showId',
});

Ticket.belongsTo(SeatRow, {
	foreignKey: 'rowId',
});

module.exports = Ticket;
