const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const SeatType = sequelize.define('seattype', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	color: { type: DataTypes.STRING, allowNull: false },
	price1: { type: DataTypes.BIGINT, allowNull: false },
	price2: { type: DataTypes.BIGINT, allowNull: false },
	price3: { type: DataTypes.BIGINT, allowNull: false },
	price4: { type: DataTypes.BIGINT, allowNull: false },
	price5: { type: DataTypes.BIGINT, allowNull: false },
	price6: { type: DataTypes.BIGINT, allowNull: false },
	price7: { type: DataTypes.BIGINT, allowNull: false },
});

module.exports = SeatType;
