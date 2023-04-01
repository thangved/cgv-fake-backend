const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');
const Language = require('./language.model');
const Room = require('./room.model');
const Movie = require('./movie.model');


const Show = sequelize.define('show', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	startAt: { type: DataTypes.DATE },
	endAt: { type: DataTypes.DATE },
});

Province.belongsTo(Language, {
	foreignKey: 'languageID',
});
Province.belongsTo(Province, {
	foreignKey: 'roomID',
});
Province.belongsTo(Province, {
	foreignKey: 'movieID',
});

module.exports = Show;
