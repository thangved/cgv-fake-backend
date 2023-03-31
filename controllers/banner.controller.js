const ApiError = require('@/api-error');
const Banner = require('@/models/banner.model');

class BannerController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const newBanner = await Banner.create(req.body);

			res.send(newBanner.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const banners = await Banner.findAll();

			res.send(banners);
		} catch (error) {
			next(new ApiError());
		}
	}
	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAllPublic(req, res, next) {
		try {
			const banners = await Banner.findAll({ where: { visible: true } });

			res.send(banners);
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

			await Banner.update(req.body, {
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
			await Banner.destroy({
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
			const banner = await Banner.findOne({
				where: { id: req.params.id },
			});

			res.send(banner.dataValues);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new BannerController();
