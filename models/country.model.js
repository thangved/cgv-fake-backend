const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');


const Country = sequelize.define('accounts', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
});


module.exports = Country;
