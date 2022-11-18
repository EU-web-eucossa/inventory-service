/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 11:17:05
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-18 14:34:43
 * @ Description:
 */

/* eslint-disable @typescript-eslint/naming-convention */
const mongoose = require('./../database/mongodb');
const slugify = require('./../utils/slugify');

const { Schema } = mongoose;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		inStock: {
			type: Boolean,
			required: true,
		},
		featuredImage: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			required: true,
			default: [],
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		featured: {
			type: Boolean,
			required: true,
		},
		ratings: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 0,
			max: 30000,
		},
		description: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

ProductSchema.index({ name: 'text', slug: 'text', description: 'text' });

const Product = mongoose.model('Product', ProductSchema);

// Slugify the product name and save it to the slug field
ProductSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

module.exports = Product;
