const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');

const Country = sequelize.define('country', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Country;
