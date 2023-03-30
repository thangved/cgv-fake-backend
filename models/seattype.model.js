const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const SeatType = sequelize.define('seattype', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	color: { type: DataTypes.STRING },
	price1: { type: DataTypes.BIGINT },
    price2: { type: DataTypes.BIGINT },
    price3: { type: DataTypes.BIGINT },
    price4: { type: DataTypes.BIGINT },
    price5: { type: DataTypes.BIGINT },
    price6: { type: DataTypes.BIGINT },
    price7: { type: DataTypes.BIGINT },
});

module.exports = SeatType;