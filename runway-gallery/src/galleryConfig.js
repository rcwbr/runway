const deepmerge = require('deepmerge')

// default gallery config -- values will be overridden by gallery config file
const defaults = {
	name: 'gallery',
	imagesFolder: 'images',
	thumbsFolder: 'images/thumbs',
	width: 960,
	imagesPerRow: 4,
	imageMargins: {
		horiz: 10,
		vert: 10
	},
	images: []
}

module.exports = (config) => {
	return deepmerge(
		defaults,
		config
	)
}
