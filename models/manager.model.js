const sequelize = require('../services/sequelize.service');

const Cinema = require('./cinema.model');
const Account = require('./account.model');

const Manager = sequelize.define('manager', {});

Manager.belongsTo(Cinema, {
	foreignKey: 'cinemaId',
});
Manager.belongsTo(Account, {
	foreignKey: 'accountId',
});

module.exports = Manager;
