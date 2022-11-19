/* eslint-disable no-undef */
/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 10:54:18
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-19 05:31:50
 * @ Description:
 */
const swaggerDocs = require('swagger-jsdoc');
// eslint-disable-next-line @typescript-eslint/naming-convention
const SwaggerUIExpress = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./run');
const { baseLogger } = require('../utils/logger');
const productRoutes = require('./routes/products.routes');
const categoryRoutes = require('./routes/categories.routes');
const { apiAddress, apiPort } = require('../config');
const errorhandler = require('../errors/errorhandler');

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Products api',
			version: '1.0.0',
		},
		servers: [
			{
				url: `http://${apiAddress}/api/v1`,

			},
			{
				url:'https://eucossa-bc.herokuapp.com/api/v1',
			}
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
	app.use(
		'/docs',
		SwaggerUIExpress.serve,
		SwaggerUIExpress.setup(openApiDocs),
	);
	app.all('*', (req, res) => {
		res.status(404).json({
			status: 'error',
			message: 'Route not found',
			path: req.originalUrl,
		});
	});
	app.use(errorhandler);
};

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
api({ app });

app.listen(apiPort, () => {
	// runServer();
	baseLogger.info(`Rest client running on http://${apiAddress}`);
});
