/* eslint-disable @typescript-eslint/naming-convention */
const mongoose = require('./../database/mongodb');

const { Schema } = mongoose;

const ProductCategorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const ProductCategory = mongoose.model(
	'Category',
	ProductCategorySchema,
);

module.exports = ProductCategory;
