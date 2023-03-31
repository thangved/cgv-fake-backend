const sequelize = require('@/services/sequelize.service');

const MovieCountry = sequelize.define(
	'moviecountry',
	{},
	{ timestamps: false }
);

module.exports = MovieCountry;
