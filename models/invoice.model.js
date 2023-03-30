const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const Account = require('./account.model');

const Invoice = sequelize.define('invoice', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	date: { type: DataTypes.DATE },
	total: { type: DataTypes.BIGINT },
});

Invoice.belongsTo(Account, {
	foreignKey: 'customerId',
});

module.exports = Invoice;
