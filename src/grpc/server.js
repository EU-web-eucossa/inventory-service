/* eslint-disable @typescript-eslint/naming-convention */
const grpc = require('@grpc/grpc-js');
const path = require('path');
const { baseDir, grpcAddress } = require('../config');
const protoLoader = require('@grpc/proto-loader');
const chalk = require('chalk');
const moment = require('moment');
const protoPath = path.join(baseDir, 'proto', 'products.proto');
const Product = require('./../models/product.model');
const Category = require('./../models/category.model');

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
};

const packageDefinition = protoLoader.loadSync(protoPath, options);

const Services = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(Services.ProductsService.service, {
	GetAllProducts: async (call, callback) => {
		try {
			const products = await Product.find();

			callback(null, { products });
		} catch (error) {
			callback(error);
		}
	},
	AddNewproduct: async (call, cb) => {
		try {
			const { product } = call.request;
			await Product.create(product);
			cb(null, { message: 'Product added successfully' });
		} catch (error) {
			cb(error);
		}
	},
	UpdateProduct: async (call, cb) => {
		try {
			const { product } = call.request;
			await Product.findByIdAndUpdate(product._id, product);
			cb(null, { message: 'Product updated successfully' });
		} catch (error) {
			cb(error);
		}
	},
	DeleteProduct: async (call, cb) => {
		try {
			const { id } = call.request;
			await Product.findByIdAndDelete(id);
			cb(null, { message: 'Product deleted successfully' });
		} catch (error) {
			cb(error);
		}
	},
});

server.addService(Services.CategoryService.service, {
	GetAllCategories: async (call, callback) => {
		try {
			const categories = await Category.find();

			callback(null, { categories });
		} catch (error) {
			callback(error);
		}
	},
	AddNewCategory: async (call, cb) => {
		try {
			const { category } = call.request;
			await Category.create(category);
			cb(null, { message: 'Category added successfully' });
		} catch (error) {
			cb(error);
		}
	},
	UpdateCategory: async (call, cb) => {
		try {
			const { category } = call.request;
			await Category.findByIdAndUpdate(category._id, category);
			cb(null, { message: 'Category updated successfully' });
		} catch (error) {
			cb(error);
		}
	},
	DeleteCategory: async (call, cb) => {
		try {
			const { id } = call.request;
			await Category.findByIdAndDelete(id);
			cb(null, { message: 'Category deleted successfully' });
		} catch (error) {
			cb(error);
		}
	},
});

server.bindAsync(
	grpcAddress,
	grpc.ServerCredentials.createInsecure(),
	(err, port) => {
		if (err) {
			console.log(chalk.red(err));

			return;
		}
		const message = `Server started on ${moment().format(
			'LLLL',
		)}\nGRPC Server running at http://localhost:${port}`;
		console.log(chalk.bgBlack.yellow(message));
		server.start();
	},
);
