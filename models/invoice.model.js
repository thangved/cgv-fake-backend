const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const Account = require('./account.model');
const Ticket = require('./ticket.model');

const Invoice = sequelize.define('invoice', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	code: { type: DataTypes.STRING, unique: true, allowNull: false },
});

Invoice.belongsTo(Account, {
	foreignKey: 'customerId',
});

Invoice.hasMany(Ticket, {
	foreignKey: 'invoiceId',
});

module.exports = Invoice;
