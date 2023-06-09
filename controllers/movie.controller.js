const ApiError = require('@/api-error');
const Category = require('@/models/category.model');
const Country = require('@/models/country.model');
const Movie = require('@/models/movie.model');
const MovieCategory = require('@/models/moviecategory.model');
const MovieCountry = require('@/models/moviecountry.model');
const sequelize = require('@/services/sequelize.service');
const { Op } = require('sequelize');

class MovieController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const newMovie = await Movie.create(req.body, { transaction: t });

			const categories = req.body.categories;
			const countries = req.body.countries;

			for (const category of categories) {
				await MovieCategory.create(
					{
						movieId: newMovie.dataValues.id,
						categoryId: category,
					},
					{ transaction: t }
				);
			}

			for (const country of countries) {
				await MovieCountry.create(
					{
						movieId: newMovie.dataValues.id,
						countryId: country,
					},
					{ transaction: t }
				);
			}

			res.send(newMovie.dataValues);
			await t.commit();
		} catch (error) {
			await t.rollback();
			next(
				new ApiError({
					statusCode: 400,
					message: 'Dữ liệu đã gửi không hợp lệ',
				})
			);
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const where = {};

			if (req.query.show === 'now') {
				where[Op.and] = [
					{ showAt: { [Op.lte]: new Date() } },
					{ showTo: { [Op.gte]: new Date() } },
				];
			}

			if (req.query.show === 'coming') {
				where.showAt = {
					[Op.gt]: new Date(),
				};
			}

			const movie = await Movie.findAll({
				include: [{ model: Country }, { model: Category }],
				where,
			});

			res.send(movie);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async update(req, res, next) {
		const t = await sequelize.transaction();
		try {
			delete req.body.id;

			const categories = req.body.categories;
			const countries = req.body.countries;

			if (categories) {
				MovieCategory.destroy({
					where: { movieId: req.params.id },
					transaction: t,
				});
				for (const category of categories) {
					await MovieCategory.create(
						{
							movieId: req.params.id,
							categoryId: category,
						},
						{ transaction: t }
					);
				}
			}

			if (countries) {
				MovieCountry.destroy({
					where: { movieId: req.params.id },
					transaction: t,
				});
				for (const country of countries) {
					await MovieCountry.create(
						{
							movieId: req.params.id,
							countryId: country,
						},
						{ transaction: t }
					);
				}
			}

			await Movie.update(req.body, {
				where: {
					id: req.params.id,
				},
				transaction: t,
			});
			await t.commit();
			res.end();
		} catch (error) {
			await t.rollback();
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async delete(req, res, next) {
		try {
			await Movie.destroy({
				where: {
					id: req.params.id,
				},
			});
			res.end();
		} catch (error) {
			next(new ApiError());
		}
	}
	/**
	 * @type {import('express').RequestHandler}
	 */
	async getByIdOrSlug(req, res, next) {
		try {
			let movie = await Movie.findOne({
				where: { id: req.params.id },
				include: [{ model: Category }, { model: Country }],
			});

			if (!movie) {
				movie = await Movie.findOne({
					where: { slug: req.params.id },
					include: [{ model: Category }, { model: Country }],
				});
			}

			if (!movie) {
				return next(
					new ApiError({
						statusCode: 404,
						message: 'Bộ phim này không tồn tại hoặc đã bị xóa',
					})
				);
			}

			res.send(movie.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new MovieController();
