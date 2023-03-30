const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');

const Banner = sequelize.define('banner', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	image: { type: DataTypes.STRING, allowNull: false },
	url: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Banner;
