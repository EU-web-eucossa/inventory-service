const chalk = require('chalk');
const express = require('express');
const client = require('./grpc/client');
const moment = require('moment');
const morgan = require('morgan');
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/naming-convention
const  Product  = require('./dto/product');
const errorhandler = require('./errors/errorhandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
	client.GetAllProducts(null, (err, data) => {
		if (err) return res.status(500).json({ error: err.message });

		return res.status(200).json({ products: data.products });
	});
});

app.post('/', (req, res) => {
	const body = req.body;

	try {
		const {
			name,
			price,
			inStock,
			featuredImage,
			images,
			category,
			featured,
			ratings,
			quantity,
			description,
		} = body;
		const newproduct = new Product(
			name,
			price,
			inStock,
			featuredImage,
			images,
			category,
			featured,
			ratings,
			quantity,
			description,
		);

		client.AddNewproduct(newproduct.toJson(), (err, data) => {
			if (err) return res.status(500).json({ error: err.message });

			return res.status(200).json(data);
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

app.use(errorhandler);
app.listen(5000, () => {
	const message = `${chalk.yellow('Server started on')} ${chalk.cyan(
		moment().format('LLLL'),
	)}\nExpress server running on ${chalk.blue('http://localhost:5000')} `;
	console.log(message);
});
