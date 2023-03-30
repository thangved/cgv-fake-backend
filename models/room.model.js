const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize.service');

const Cinema = require('./cinema.model');

const Room = sequelize.define('room', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
});

Room.belongsTo(Cinema, {
	foreignKey: 'cinemaId',
});

module.exports = Room;
