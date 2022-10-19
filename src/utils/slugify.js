const slugify = (string) => {
	return string
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/&/g, '-and-')
		.replace(/[\s\W-]+/g, '-');
};

module.exports = slugify;
