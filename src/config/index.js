/* eslint-disable @typescript-eslint/naming-convention */
const config = require('./../../node.config');
const {
	BASE_DIR: baseDir,
	ENV: env,
	GRPC_HOST: grpcHost,
	GRPC_PORT: grpcPort,
} = config.config;

module.exports = {
	baseDir,
	env,
	grpcAddress: `${grpcHost}:${grpcPort}`,
	grpcHost,
	grpcPort,
};
