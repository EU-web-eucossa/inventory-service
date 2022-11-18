/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 11:16:23
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-18 13:12:14
 * @ Description:
 */

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
	{ timestamps: true }
);
ProductCategorySchema.index({ name: 'text', description: 'text' });

const ProductCategory = mongoose.model('Category', ProductCategorySchema);

module.exports = ProductCategory;
