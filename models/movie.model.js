const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');
const MovieCategory = require('./moviecategory.model');
const Country = require('./country.model');

const Movie = sequelize.define('movie', {
	title: { type: DataTypes.STRING },
	brief: { type: DataTypes.STRING },
	slug: { type: DataTypes.STRING },
    studio: { type: DataTypes.STRING },
    director: { type: DataTypes.STRING },
    verPoster: { type: DataTypes.STRING },
    horPoster: { type: DataTypes.STRING },
    trailer: { type: DataTypes.STRING },
    minutes: { type: DataTypes.INTEGER },
    content: { type: DataTypes.STRING },
    showAt: { type: DataTypes.DATEONLY },
});

Movie.belongsTo(MovieCategory, {
	foreignKey: 'id',
});

Movie.belongsTo(Country), {
    foreignKey: 'countryid',
}

module.exports = Account;
