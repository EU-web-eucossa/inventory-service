/* eslint-disable @typescript-eslint/naming-convention */
/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 10:38:45
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-19 05:24:48
 * @ Description:
 */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { baseDir, grpcAddress } = require('../../config');
const ProductServiceHandler = require('./services/productServiceHandler');
const CategoryServiceHandler = require('./services/categoryServiceHandler');
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
server.addService(productPackage.ProductService.service, ProductServiceHandler);

server.addService(productPackage.CategoryService.service, CategoryServiceHandler);

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
