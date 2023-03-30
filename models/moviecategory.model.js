const sequelize = require('@/services/sequelize.service');
const { DataTypes } = require('sequelize');
const Category = require('./category.model');


const MovieCategory = sequelize.define('moviecategory', {
	movieid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

});

MovieCategory.belongsTo(Category, {
	foreignKey: 'categoryid',
});


module.exports = MovieCategory;
