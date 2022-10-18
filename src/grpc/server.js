const grpc = require('@grpc/grpc-js');
const path = require('path');
const { baseDir, grpcAddress } = require('../config');
const protoLoader = require('@grpc/proto-loader');
const chalk = require('chalk');
const moment = require('moment');
const protoPath = path.join(baseDir, 'proto', 'news.proto');

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
};

const packageDefinition = protoLoader.loadSync(protoPath, options);

const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const news = [
	{
		id: 1,
		title: 'News 1',
		content: 'Content 1',
	},
	{
		id: 2,
		title: 'News 2',
		content: 'Content 2',
	},
];

server.addService(newsProto.NewsService.service, {
	GetAllNews:async (call, callback) => {
		callback(null, { news });
	},
});
console.log('Path', protoPath);

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
