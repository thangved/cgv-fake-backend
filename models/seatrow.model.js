const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const SeatType = require('./seattype.model');
const Room = require('./room.model');

const SeatRow = sequelize.define('seatrow', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	label: { type: DataTypes.STRING },
	quantity: { type: DataTypes.INTEGER },
});

SeatRow.belongsTo(SeatType, {
	foreignKey: 'seatTypeId',
});
SeatRow.belongsTo(Room, {
	foreignKey: 'roomId',
});

module.exports = SeatRow;
