/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { ProductServiceError } = require('../errors/err');
const { baseLogger } = require('../utils/logger');
const { capitalize } = require('string-shuffle');

module.exports = async (err, req, res, next) => {
	// Compare instance of two objsects
	if (err instanceof ProductServiceError)
		return res.status(err.statusCode).json(err);

	if (err.name === 'ValidationError') {
		const error = [];
		for (const key of Object.keys(err['errors']))
			error.push(`${capitalize(key)} field is required`);

		return res.status(400).json({
			data: {
				error,
			},
			status: 'error',
			message: 'Invalid inputs',
		});
	}
	if (err.code === 11000) {
		let error = '';
		const x = err['keyValue'];
		for (const key of Object.keys(x))
			error += `${capitalize(key)} ${x[key]} already exists`;

		return res.status(409).json({
			status: 'error',
			message: 'Duplicate entry',
			data: { error },
		});
	}
	baseLogger.error(JSON.stringify(err));

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error',
		data: {},
	});
};
