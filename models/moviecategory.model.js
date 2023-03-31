const sequelize = require('@/services/sequelize.service');

const MovieCategory = sequelize.define(
	'moviecategory',
	{},
	{ timestamps: false }
);

module.exports = MovieCategory;
