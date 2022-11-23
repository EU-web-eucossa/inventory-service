/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 12:32:43
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-23 15:21:30
 * @ Description:
 */

const { productClient } = require('../../grpc/client');
const { validateMongoId } = require('../../utils/mongoId');
const slugify = require('../../utils/slugify');

const router = require('express').Router();

router.get('/', async (req, res) => {
	const { page, limit } = req.query;
	productClient.getAllProducts(
		{
			page: page ? page : 1,
			limit: limit ? limit : 20,
		},
		(err, response) => {
			if (err) return res.status(500).json({ error: err });
			else return res.json(response ? response : {});
		},
	);
});

/**
 * Add a new product
 */
router.post('/add', async (req, res, next) => {
	req.body.createdAt = new Date();
	req.body.updatedAt = new Date();
	req.body._id = 'someid';

	const obj = req.body;

	if (!obj.name) return res.status(400).json({ error: 'Name is required' });

	if (!obj.price) return res.status(400).json({ error: 'Price is required' });

	if (!obj.inStock)
		return res.status(400).json({ error: 'InStock is required' });

	if (!obj.featuredImage)
		return res.status(400).json({ error: 'FeaturedImage is required' });

	if (!obj.images) obj.images = [];

	if (!obj.category)
		return res.status(400).json({ error: 'Category is required' });

	if (!obj.featured) obj.featured = false;

	if (!obj.ratings)
		return res.status(400).json({ error: 'Ratings is required' });

	if (!obj.quantity)
		return res.status(400).json({ error: 'Quantity is required' });

	if (!obj.description)
		return res.status(400).json({ error: 'Description is required' });

	if (!obj.slug && obj.name) obj.slug = slugify(obj.name);

	if (!validateMongoId(obj.category))
		return res.status(400).json({ error: 'Invalid category id' });

	productClient.addNewProduct({ product: obj }, (err, response) => {
		if (err) return res.status(500).json({ error: err });
		else return res.json({ response });
	});
});

/**
 * Update a product
 *
 * /
 */
router.put('/update/:id', async (req, res, next) => {
	const { id } = req.params;
	if (!validateMongoId(id))
		return res.status(400).json({ error: 'Invalid product id' });

	const obj = req.body;
	productClient.updateProduct({ product:obj ,id }, (err, response) => {
		if (err) return res.status(500).json({ error: err });
		else return res.json({ response });
	});
});
module.exports = router;
