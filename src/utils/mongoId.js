const mongoose = require('mongoose');

/**
 * Validate if the id is a valid mongo id or not
 * @param {string} id
 * @returns
 */
function validateMongoId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}
module.exports = { validateMongoId };
