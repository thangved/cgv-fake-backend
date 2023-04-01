const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');
const slugify = require('slugify');
const Category = require('./category.model');
const Country = require('./country.model');
const MovieCategory = require('./moviecategory.model');
const MovieCountry = require('./moviecountry.model');

const Movie = sequelize.define('movie', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	brief: { type: DataTypes.STRING, allowNull: false },
	slug: { type: DataTypes.STRING, unique: true },
	studio: { type: DataTypes.STRING, allowNull: false },
	director: { type: DataTypes.STRING, allowNull: false },
	verPoster: { type: DataTypes.STRING, allowNull: false },
	horPoster: { type: DataTypes.STRING, allowNull: false },
	trailer: { type: DataTypes.STRING, allowNull: false },
	minutes: { type: DataTypes.INTEGER, allowNull: false },
	content: { type: DataTypes.TEXT, allowNull: false },
	showAt: { type: DataTypes.DATEONLY, allowNull: false },
	showTo: { type: DataTypes.DATEONLY, allowNull: false },
});

Movie.belongsToMany(Country, {
	through: MovieCountry,
});

Movie.belongsToMany(Category, {
	through: MovieCategory,
});

Movie.beforeCreate((instance) => {
	instance.slug = slugify(instance.title, { lower: true });
});

Movie.beforeUpdate((instance) => {
	if (instance.changed('title')) {
		instance.slug = slugify(instance.title, { lower: true });
	}
});

module.exports = Movie;
