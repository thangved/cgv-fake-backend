const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');
const Gender = require('./gender.model');

const Account = sequelize.define('accounts', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	fullName: { type: DataTypes.STRING },
	avatar: { type: DataTypes.STRING },
	dateOfBirth: { type: DataTypes.DATEONLY },
	email: { type: DataTypes.STRING },
	admin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Account.belongsTo(Gender, {
	foreignKey: 'genderId',
});

module.exports = Account;
