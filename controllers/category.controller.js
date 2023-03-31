const ApiError = require('@/api-error');
const Category = require('@/models/category.model');

class CategoryController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const newCategory = await Category.create(req.body);

			res.send(newCategory.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const categories = await Category.findAll();

			res.send(categories);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async update(req, res, next) {
		try {
			delete req.body.id;

			await Category.update(req.body, {
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
	async delete(req, res, next) {
		try {
			await Category.destroy({
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
	async getById(req, res, next) {
		try {
			const category = await Category.findOne({
				where: { id: req.params.id },
			});

			res.send(category.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new CategoryController();
