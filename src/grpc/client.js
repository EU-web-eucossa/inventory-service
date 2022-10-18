const grpc = require('@grpc/grpc-js');
const path = require('path');
const { baseDir, grpcAddress } = require('../config');
const protoLoader = require('@grpc/proto-loader');
const protoPath = path.join(baseDir, 'proto', 'news.proto');

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
};

const packageDefinition = protoLoader.loadSync(protoPath, options);
// eslint-disable-next-line @typescript-eslint/naming-convention
const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const client = new NewsService(grpcAddress, grpc.credentials.createInsecure());

if (typeof client.GetAllNews === 'function') {
	client.GetAllnews({}, (err, response) => {
		if (err) console.log(err);
		else console.log('Response: ', response);
	});
}
console.log(client.GetAllNews);

module.exports = client;
