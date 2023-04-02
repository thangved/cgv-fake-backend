const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');
const Language = require('./language.model');
const Room = require('./room.model');

const Show = sequelize.define('show', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	startAt: { type: DataTypes.DATE },
	endAt: { type: DataTypes.DATE },
});

Show.belongsTo(Language, {
	foreignKey: 'languageId',
});
Show.belongsTo(Room, {
	foreignKey: 'roomId',
});

module.exports = Show;
