const deepmerge = require('deepmerge')

const defaults = {
	name: 'gallery',
	imagesFolder: 'images',
	thumbsFolder: 'images/thumbs',
	images: []
}

module.exports = (config) => {
	return deepmerge(
		defaults,
		config
	)
}
