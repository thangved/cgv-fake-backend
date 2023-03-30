const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');

const Province = sequelize.define('province', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
});

module.exports = Province;
