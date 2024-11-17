const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');
const Gender = require('./gender.model');

const Account = sequelize.define('account', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	fullName: { type: DataTypes.STRING, allowNull: false },
	avatar: { type: DataTypes.TEXT, allowNull: false },
	dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	admin: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
});

Account.belongsTo(Gender, {
	foreignKey: 'genderId',
});

module.exports = Account;
