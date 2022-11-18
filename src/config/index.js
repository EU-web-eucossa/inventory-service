/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 11:30:24
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-18 13:15:18
 * @ Description:
 */

/* eslint-disable @typescript-eslint/naming-convention */
const config = require('./../../node.config');
const {
	BASE_DIR: baseDir,
	ENV: env,
	GRPC_HOST: grpcHost,
	GRPC_PORT: grpcPort,
	HOST_NAME: hostName,
	MONGO_URL: mongoUrl,
	API_HOST: apiHost,
	API_PORT: apiPort,
} = config;

module.exports = {
	baseDir,
	env,
	grpcAddress: `${grpcHost}:${grpcPort}`,
	grpcHost,
	grpcPort,
	hostName,
	mongoUrl,
	apiHost,
	apiPort,
	apiAddress: `${apiHost}:${apiPort}`,
};