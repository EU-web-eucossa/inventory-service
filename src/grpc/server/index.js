/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 10:38:45
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-18 14:28:28
 * @ Description:
 */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { baseDir, grpcAddress } = require('../../config');
const ProductCategory = require('../../models/category.model');
const Product = require('../../models/product.model');
const { baseLogger } = require('../../utils/logger');
const packageDefinition = protoLoader.loadSync(
	path.join(baseDir, 'proto', 'products.proto'),
	{}
);
const productPackage =
  grpc.loadPackageDefinition(packageDefinition).productPackage;

// Create a server
const server = new grpc.Server();
// Add the service
server.addService(productPackage.ProductService.service, {
	getAllProducts: async (call, callback) => {
		const { page, limit } = call.request;
		const products = await Product.find({})
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);
		let total = await Product.countDocuments();

		return products.length > 0
			? callback(null, { products, total, page, limit })
			: callback(null, { products: [], total: 0, page, limit });
	},
	addNewProduct: (call, cb) => {
		console.log(call.request);
		const {
			_id: _i,
			createdAt: _c,
			updatedAt: _u,
			...props
		} = call.request.product;
		const newProduct = new Product(props);
		newProduct.save((err, product) => {
			if (err) 
				cb(err, null);
      
			cb(null, { product });
		});
	},
	updateProduct: (call, cb) => {
		const { product } = call.request;
		Product.findByIdAndUpdate(
			product._id,
			product,
			{ new: true },
			(err, product) => {
				if (err) 
					cb(err, null);
        
				cb(null, { product });
			}
		);
	},
	deleteProduct: (call, cb) => {
		const { id } = call.request;
		Product.findByIdAndDelete(id, (err, product) => {
			if (err) 
				cb(err, null);
      
			cb(null, { product });
		});
	},
	searchProduct: async (call, cb) => {
		const { q, page, limit } = call.request;
		const products = await Product.find(
			{ $text: { $search: q } },
			{ score: { $meta: 'textScore' } }
		)
			.sort({ score: { $meta: 'textScore' } })
			.skip((page - 1) * limit)
			.limit(limit);
		products.length > 0 ? cb(null, { products }) : cb(null, { products: [] });
	},
	getProductById: (call, cb) => {
		const { id } = call.request;
		Product.findById(id, (err, product) => {
			if (err) 
				cb(err, null);
      
			cb(null, { product });
		});
	},
});

server.addService(productPackage.CategoryService.service, {
	getAllCategories: async (call, cb) => {
		const { page, limit } = call.request;
		const categories = await ProductCategory.find({})
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);
		categories.length > 0 ? cb(null, { categories }) : cb(null, { categories });
	},
	addNewCategory: (call, cb) => {
		const newCategory = new ProductCategory(call.request);
		newCategory.save((err, category) => {
			if (err) 
				cb(err, null);
      
			cb(null, { category });
		});
	},
	updateCategory: (call, cb) => {
		const { category } = call.request;
		ProductCategory.findByIdAndUpdate(
			category._id,
			category,
			{ new: true },
			(err, category) => {
				if (err) 
					cb(err, null);
        
				cb(null, { category });
			}
		);
	},
	deleteCategory: (call, cb) => {
		const { id } = call.request;
		ProductCategory.findByIdAndDelete(id, (err, category) => {
			if (err) 
				cb(err, null);
      
			cb(null, { category });
		});
	},
	searchCategory: (call, cb) => {
		const { q, page, limit } = call.request;
		ProductCategory.find(
			{ $text: { $search: q } },
			{ score: { $meta: 'textScore' } }
		)
			.sort({ score: { $meta: 'textScore' } })
			.skip((page - 1) * limit)
			.limit(limit)
			.exec((err, categories) => {
				if (err) 
					cb(err, null);
        
				cb(null, { categories });
			});
	},
	getCategoryById: (call, cb) => {
		const { id } = call.request;
		ProductCategory.findById(id, (err, category) => {
			if (err) 
				cb(err, null);
      
			cb(null, { category });
		});
	},
});

function runGrpcServer() {
	// Start the server

	server.bindAsync(grpcAddress, grpc.ServerCredentials.createInsecure(), () => {
		baseLogger.info('Server running at http://127.0.0.1:50051');
		server.start();
	}); // our sever is insecure, no ssl configuration
}

module.exports = {
	runServer: runGrpcServer,
};
