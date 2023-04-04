const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');
const Province = require('./province.model');

const Cinema = sequelize.define('cinema', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	address: { type: DataTypes.STRING, allowNull: false },
});

Cinema.belongsTo(Province, {
	foreignKey: 'provinceId',
});

module.exports = Cinema;
