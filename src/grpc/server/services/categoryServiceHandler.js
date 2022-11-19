/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-19 05:20:17
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-19 05:24:09
 * @ Description:
 */
/* eslint-disable @typescript-eslint/naming-convention */
const ProductCategory = require('../../../models/category.model');
const getAllCategories = async (call, cb) => {
	const { page, limit } = call.request;
	const categories = await ProductCategory.find({})
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	let total = await ProductCategory.countDocuments();
	categories.length > 0
		? cb(null, { categories, page, limit, total })
		: cb(null, { categories, page, limit, total });
};
const addNewCategory = async (call, cb) => {
	const newCategory = new ProductCategory(call.request);
	newCategory.save((err, category) => {
		if (err) cb(err, null);

		cb(null, { category });
	});
};
const updateCategory = async (call, cb) => {
	const { category } = call.request;
	ProductCategory.findByIdAndUpdate(
		category._id,
		category,
		{ new: true },
		(err, category) => {
			if (err) cb(err, null);

			cb(null, { category });
		},
	);
};
const deleteCategory = async (call, cb) => {
	const { id } = call.request;
	ProductCategory.findByIdAndDelete(id, (err, category) => {
		if (err) cb(err, null);

		cb(null, { category });
	});
};
const searchCategory = async (call, cb) => {
	const { q, page, limit } = call.request;
	ProductCategory.find(
		{ $text: { $search: q } },
		{ score: { $meta: 'textScore' } },
	)
		.sort({ score: { $meta: 'textScore' } })
		.skip((page - 1) * limit)
		.limit(limit)
		.exec((err, categories) => {
			if (err) cb(err, null);

			cb(null, { categories });
		});
};
const getCategoryById = async (call, cb) => {
	const { id } = call.request;
	ProductCategory.findById(id, (err, category) => {
		if (err) cb(err, null);

		cb(null, { category });
	});
};

module.exports = Object.freeze({
	getAllCategories,
	addNewCategory,
	updateCategory,
	deleteCategory,
	searchCategory,
	getCategoryById,
});
