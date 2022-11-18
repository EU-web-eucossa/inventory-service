/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 12:34:26
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-18 14:24:28
 * @ Description:
 */

const { categoriesClient } = require('../../grpc/client');
const { requestLogger } = require('../../utils/logger');

const router = require('express').Router();
/**
 * Get all categories
 *
 */
router.get('/', requestLogger, async (req, res) => {
	const { page, limit } = req.query;

	return categoriesClient.getAllCategories(
		{ page: page ? page : 1, limit: limit ? limit : 20 },
		async (err, response) => {
			const resp = await response;
			if (err) 
        
				return res.status(500).json({ error: err.message });
			else 
				return res.json(response);
      
		}
	);
});

/**
 * Create a new category
 */
router.post('/add', requestLogger, async (req, res) => {
	const {
		name,
		description,
		image,
		_id = 'someid',
		createdAt = new Date(),
		updatedAt = new Date(),
	} = req.body;
	if (!name) 
		return res.status(400).json({ error: 'Name is required' });
  
	if (!description) 
		return res.status(400).json({ error: 'Description is required' });
  
	if (!image) 
		return res.status(400).json({ error: 'Image is required' });
  
	const category = { name, description, image, _id, createdAt, updatedAt };

	return categoriesClient.addNewCategory(category, async (err, response) => {
		if (err) 
			return res.status(500).json({ error: err.message });
		else 
			return res.json(response);
    
	});
});

/**
 * Get a category by id
 * @param {string} id
 * @returns {object} category
 *
 */
router.get('/find/:id', requestLogger, async (req, res) => {
	const { id } = req.params;
	if (!id) 
		return res.status(400).json({ error: 'Id is required' });
  
	return categoriesClient.getCategoryById({ id }, async (err, response) => {
		if (err) 
			return res.status(500).json({ error: err.message });
		else 
			return res.json(response);
    
	});
});

/**
 * Update a category
 *
 */
router.put('/update/:id', requestLogger, async (req, res) => {
	const { id } = req.params;

	return categoriesClient.updateCategory(
		{ id, ...req.body },
		async (err, response) => {
			if (err) 
				return res.status(500).json({ error: err.message });
			else 
				return res.json(response);
      
		}
	);
});

/**
 * Search for a category
 * /
 *
 */
router.get('/search', requestLogger, async (req, res) => {
	const { name } = req.query;
	if (!name) 
		return res.status(400).json({ error: 'Name is required' });
  
	return categoriesClient.searchCategory({ name }, async (err, response) => {
		if (err) 
			return res.status(500).json({ error: err.message });
		else 
			return res.json(response);
    
	});
});

module.exports = router;
