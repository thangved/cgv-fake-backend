const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const Gender = sequelize.define('gender', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
	},
});

module.exports = Gender;
