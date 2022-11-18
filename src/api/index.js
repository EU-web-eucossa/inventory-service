/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 10:54:18
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-18 13:16:20
 * @ Description:
 */

const express = require('express');
const morgan = require('morgan');
require('./run');
const { baseLogger } = require('../utils/logger');
const productRoutes = require('./routes/products.routes');
const categoryRoutes = require('./routes/categories.routes');
const { apiAddress, apiPort } = require('../config');

const app = express();
const port = process.env.PORT || 5000;

/**
 *
 * @param {{app:express.Application}} param0
 */
const api = ({ app } = {}) => {
	const router = express.Router();
	router.use('/categories', categoryRoutes);
	router.use('/products', productRoutes);
	app.use('/api/v1', router);
};

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
api({app});

app.listen(apiPort, () => {
	// runServer();
	baseLogger.info(`Rest client running on http://${apiAddress}`);
});
