const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const Invoice = require('./invoice.model');
const Ticket = require('./ticket.model');

const InvoiceDetail = sequelize.define('invoicedetail', {
});

InvoiceDetail.belongsTo(Invoice, {
	foreignKey: 'invoiceId',
});
InvoiceDetail.belongsTo(Ticket, {
	foreignKey: 'ticketId',
});

module.exports = InvoiceDetail;