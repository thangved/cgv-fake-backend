const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const Invoice = require('./account.model');

const InvoiceDetail = sequelize.define('invoicedetail', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

InvoiceDetail.belongsTo(Invoice, {
	foreignKey: 'InvoiceId',
});

module.exports = InvoiceDetail;