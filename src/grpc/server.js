const grpc = require('@grpc/grpc-js');
const path = require('path');
const { baseDir, grpcAddress } = require('../config');
const protoLoader = require('@grpc/proto-loader');
const chalk = require('chalk');
const moment = require('moment');
const protoPath = path.join(baseDir, 'proto', 'products.proto');
const products = require('./data');

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
};

const packageDefinition = protoLoader.loadSync(protoPath, options);

// eslint-disable-next-line @typescript-eslint/naming-convention
const ProductService = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(ProductService.ProductsService.service, {
	GetAllProducts: async (call, callback) => {
		callback(null, { products });
	},
	AddNewproduct: async (call, cb) => {
		const _newProduct = call.request;
		_newProduct.id = new Date().getTime().toString();
		products.push(_newProduct);

		cb(null, _newProduct);
	},
	UpdateProduct: async (call, cb) => {
		const _id = call.request.id;
		const product = call.request.product;
		let _existingProduct = products.find((p) => p.id === _id);
		_existingProduct = { ..._existingProduct, ...product };
		cb(null, _existingProduct);
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
		)}\nServer running at http://localhost:${port}`;
		console.log(chalk.bgBlack.yellow(message));
		server.start();
	},
);
