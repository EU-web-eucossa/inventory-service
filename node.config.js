/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
// Load enviroment variables from .env file
dotenv.config();

const config = {
	BASE_DIR: path.resolve(path.dirname(__filename)),
	ENV: process.env.NODE_ENV || 'development',
	HOST_NAME: process.env.HOST_NAME || 'localhost',
	GRPC_PORT: process.env.GRPC_PORT || 5001,
	GRPC_HOST: process.env.GRPC_HOST || 'localhost',
};

module.exports.config = Object.freeze(config);