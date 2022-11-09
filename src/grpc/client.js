const grpc = require('@grpc/grpc-js');
const path = require('path');
const { baseDir, grpcAddress } = require('../config');
const protoLoader = require('@grpc/proto-loader');
const protoPath = path.join(baseDir, 'proto', 'products.proto');

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
};

const packageDefinition = protoLoader.loadSync(protoPath, options);
// eslint-disable-next-line @typescript-eslint/naming-convention
const ProductService = grpc.loadPackageDefinition(packageDefinition).ProductsService;

const client = new ProductService(grpcAddress, grpc.credentials.createInsecure());

client.GetAllProducts({}, (err, response) => {
	if (err) throw new Error(err.messsage);
	else return response;
});

// eslint-disable-next-line no-undef
client.AddNewproduct({}, (err, response) => {
	if (err) throw new Error(err);
	else return response;
});

module.exports = client;
