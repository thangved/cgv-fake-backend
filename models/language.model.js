const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const Language = sequelize.define('language', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
	},
});

module.exports = Language;
