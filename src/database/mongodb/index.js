/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 11:09:54
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-18 13:12:00
 * @ Description:
 */

const { dbLogger } = require('./../../utils/logger');
const mongoose = require('mongoose');
const { mongoUrl } = require('./../../config');
const moment = require('moment');

mongoose.connect(mongoUrl);

mongoose.connection.on('connected', () => {
	dbLogger.info(
		JSON.stringify({
			message: 'MongoDB connected',
			time: moment().format('LLLL'),
		}),
	);
});
mongoose.connection.on('error', (err) => {
	dbLogger.error(
		JSON.stringify({ time: moment().format('LLLL'), error: err.message }),
	);
});

mongoose.connection.on('disconnected', () => {
	dbLogger.error(
		JSON.stringify({
			time: moment().format('LLLL'),
			message: 'MongoDB disconnected',
		}),
	);
});
mongoose.connection.on('reconnected', () => {
	dbLogger.error(
		JSON.stringify({
			time: moment().format('LLLL'),
			message: 'MongoDB reconnected',
		}),
	);
});

module.exports = mongoose;
