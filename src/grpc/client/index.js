/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 10:39:25
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-18 13:13:46
 * @ Description:
 */

const grpc = require('@grpc/grpc-js');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const { baseDir, grpcAddress } = require('../../config');
const packageDefinition = protoLoader.loadSync(
	path.join(baseDir, 'proto', 'products.proto'),
	{}
);
const productPackage =
  grpc.loadPackageDefinition(packageDefinition).productPackage;
const productClient = new productPackage.ProductService(
	grpcAddress,
	grpc.credentials.createInsecure()
);

const categoriesClient = new productPackage.CategoryService(
	grpcAddress,
	grpc.credentials.createInsecure()
);

module.exports = {
	productClient,
	categoriesClient,
};
