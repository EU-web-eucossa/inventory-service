/* eslint-disable no-undef */
/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 10:54:18
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-19 05:12:36
 * @ Description:
 */
const swaggerDocs = require('swagger-jsdoc');
// eslint-disable-next-line @typescript-eslint/naming-convention
const SwaggerUIExpress = require('swagger-ui-express');
const express = require('express');
const morgan = require('morgan');
require('./run');
const { baseLogger } = require('../utils/logger');
const productRoutes = require('./routes/products.routes');
const categoryRoutes = require('./routes/categories.routes');
const { apiAddress, apiPort } = require('../config');

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Products api',
			version: '1.0.0',
		},
		servers: [
			{
				url: `http://${apiAddress}`,
			},
		],
	},
	apis: ['./routes/products.routes.js', './routes/categories.routes.js'], // files containing swagger annotations as above
};
const openApiDocs = swaggerDocs(swaggerOptions);
const app = express();

/**
 *
 * @param {{app:express.Application}} param0
 */
const api = ({ app } = {}) => {
	const router = express.Router();
	router.use('/categories', categoryRoutes);
	router.use('/products', productRoutes);
	app.use('/api/v1', router);
	app.use('/docs', SwaggerUIExpress.serve, SwaggerUIExpress.setup(openApiDocs));
};

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
api({ app });

app.listen(apiPort, () => {
	// runServer();
	baseLogger.info(`Rest client running on http://${apiAddress}`);
});
