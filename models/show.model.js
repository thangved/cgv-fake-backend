const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');
const Language = require('./language.model');
const Room = require('./room.model');
const Movie = require('./movie.model');

const Show = sequelize.define('show', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	startAt: { type: DataTypes.DATE, allowNull: false },
	endAt: { type: DataTypes.DATE, allowNull: false },
});

Show.belongsTo(Language, {
	foreignKey: 'languageId',
});

Show.belongsTo(Movie, {
	foreignKey: 'movieId',
});

Show.belongsTo(Room, {
	foreignKey: 'roomId',
});

module.exports = Show;
