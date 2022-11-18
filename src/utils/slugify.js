/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-18 11:17:25
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-18 14:36:07
 * @ Description:
 */

/**
 * @param {string} data
 */
const slugify = (data) => {
	return data
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
};

module.exports = slugify;
