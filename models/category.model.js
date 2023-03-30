const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('category', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
});

module.exports = Category;
