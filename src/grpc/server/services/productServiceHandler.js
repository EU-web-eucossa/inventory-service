/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-19 05:14:28
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-19 05:18:29
 * @ Description:
 */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
const Product = require('../../../models/product.model');

const getAllProducts = async (call, callback) => {
	const { page, limit } = call.request;
	const products = await Product.find({})
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	let total = await Product.countDocuments();

	return products.length > 0
		? callback(null, { products, total, page, limit })
		: callback(null, { products: [], total: 0, page, limit });
};
const addNewProduct = (call, cb) => {
	console.log(call.request);
	const {
		_id: _i,
		createdAt: _c,
		updatedAt: _u,
		...props
	} = call.request.product;
	const newProduct = new Product(props);
	newProduct.save((err, product) => {
		if (err) cb(err, null);

		cb(null, { product });
	});
};
const updateProduct = async (call, cb) => {
	const { product } = call.request;
	Product.findByIdAndUpdate(
		product._id,
		product,
		{ new: true },
		(err, product) => {
			if (err) cb(err, null);

			cb(null, { product });
		},
	);
};
const deleteProduct = async (call, cb) => {
	const { id } = call.request;
	Product.findByIdAndDelete(id, (err, product) => {
		if (err) cb(err, null);

		cb(null, { product });
	});
};
const searchProduct = async (call, cb) => {
	const { q, page, limit } = call.request;
	const products = await Product.find(
		{ $text: { $search: q } },
		{ score: { $meta: 'textScore' } },
	)
		.sort({ score: { $meta: 'textScore' } })
		.skip((page - 1) * limit)
		.limit(limit);
	products.length > 0 ? cb(null, { products }) : cb(null, { products: [] });
};
const getProductById = async (call, cb) => {
	const { id } = call.request;
	Product.findById(id, (err, product) => {
		if (err) cb(err, null);

		cb(null, { product });
	});
};

module.exports = Object.freeze({
	getAllProducts,
	addNewProduct,
	updateProduct,
	deleteProduct,
	searchProduct,
	getProductById,
});
