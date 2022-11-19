/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 10:36:54
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-19 04:57:14
 * @ Description:
 */

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
// Load enviroment variables from .env file
dotenv.config();

const config = {
	BASE_DIR: path.resolve(path.dirname(__filename)),
	API_HOST: process.env.API_HOST||'localhost',
	API_PORT: process.env.PORT||'5000',
	ENV: process.env.NODE_ENV || 'development',
	HOST_NAME: process.env.HOST_NAME || 'localhost',
	GRPC_PORT: process.env.GRPC_PORT || 5001,
	GRPC_HOST: process.env.GRPC_HOST || 'localhost',
	MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/eucossa-web2-product-service',
};

module.exports = Object.freeze(config);