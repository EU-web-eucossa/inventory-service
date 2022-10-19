const slugify = require('../utils/slugify');

class Product {
	constructor(
		name,
		price,
		inStock = true,
		featuredImage = 'https://via.placeholder.com/400x400',
		images = [],
		category,
		featured = false,
		ratings = 1,
		quantity,
		description,
	) {
		if (!(name && price,quantity && category && description)) {
			throw new Error(
				'Missing required fields(name,price,category,quantity,description)',
			);
		}
		if (typeof price !== 'number')
			throw new Error('Price must be a number');

		if (typeof quantity !== 'number')
			throw new Error('Quantity must be a number');

		this._name = name;
		this._slug = slugify(name);
		this._price = price;
		this._inStock = inStock;
		this._featuredImage = featuredImage;
		this._featured = featured;
		this._category = category;
		this._ratings = ratings;
		this._quantity = quantity;
		this._description = description;
		this._description = description;
		this._images = images;
	}

	/**
	 * @memberof Product
	 * @param {string} value
	 */
	set name(value) {
		this._name = value;
	}

	/**
	 * @memberof Product
	 * @returns {string}
	 */
	get name() {
		return this._name;
	}

	/**
	 * @memberof Product
	 * @param {string} value
	 */
	set slug(value) {
		this._slug = slugify(value);
	}

	/**
	 * @memberof Product
	 * @returns {string}
	 */
	get slug() {
		return this._slug;
	}

	/**
	 * @memberof Product
	 * @param {number} value
	 */
	set price(value) {
		this._price = value;
	}

	/**
	 * @memberof Product
	 * @returns {number}
	 */
	get price() {
		return this._price;
	}

	/**
	 * @memberof Product
	 * @param {boolean} value
	 */
	set inStock(value) {
		this._inStock = value;
	}

	/**
	 * @memberof Product
	 * @returns {boolean}
	 */
	get inStock() {
		return this._inStock;
	}

	/**
	 * @memberof Product
	 * @param {string} value
	 */
	set featuredImage(value) {
		this._featuredImage = value;
	}

	/**
	 * @memberof Product
	 * @returns {string}
	 */
	get featuredImage() {
		return this._featuredImage;
	}

	/**
	 * @memberof Product
	 * @param {boolean} value
	 */
	set featured(value) {
		this._featured = value;
	}

	/**
	 * @memberof Product
	 * @returns {boolean}
	 */
	get featured() {
		return this._featured;
	}

	/**
	 * @memberof Product
	 * @param {string} value
	 */
	set category(value) {
		this._category = value;
	}

	/**
	 * @memberof Product
	 * @returns {string}
	 */
	get category() {
		return this._category;
	}

	/**
	 * @memberof Product
	 * @param {number} value
	 */
	set ratings(value) {
		this._ratings = value;
	}

	/**
	 * @memberof Product
	 * @returns {number}
	 */
	get ratings() {
		return this._ratings;
	}

	/**
	 * @memberof Product
	 * @param {number} value
	 */
	set quantity(value) {
		this._quantity = value;
	}

	/**
	 * @memberof Product
	 * @returns {number}
	 */
	get quantity() {
		return this._quantity;
	}

	/**
	 * @memberof Product
	 * @param {string} value
	 */
	set description(value) {
		this._description = value;
	}

	/**
	 * @memberof Product
	 * @returns {string}
	 */
	get description() {
		return this._description;
	}

	/**
	 * @memberof Product
	 * @param {Array<string>} value
	 */
	set images(value) {
		this._images = value;
	}

	/**
	 * @memberof Product
	 * @returns {Array<string>}
	 */
	get images() {
		return this._images;
	}

	/**
	 *
	 * @returns {typeof Product}
	 */
	toJson = () => {
		return {
			name: this.name,
			slug: this.slug,
			price: this.price,
			inStock: this.inStock,
			featuredImage: this.featuredImage,
			images: this.images,
			category: this.category,
			featured: this.featured,
			ratings: this.ratings,
			quantity: this.quantity,
			description: this.description,
		};
	};
}

module.exports = Product;
