const deepmerge = require('deepmerge')
const fs = require('fs')
const sharp = require('sharp')

// apply default config to gallery config
const galleryConfigDefaults = {
	name: 'gallery',
	imagesFolder: 'images',
	thumbsFolder: 'images/thumbs',
	images: []
}
const galleryConfig = deepmerge(
	galleryConfigDefaults,
	require('./testGallery.runwayconf.js')
)
var images = galleryConfig.images

// prepare thumbs folder
try {
	fs.mkdirSync(galleryConfig.thumbsFolder)
} catch (err) {
	if (err.code !== 'EEXIST') throw err
}

// read metadata from images
var metadataPromises = []
images.forEach(image => {
	image.sourcePath = galleryConfig.imagesFolder + '/' + image.filename
	image.thumbPath = galleryConfig.thumbsFolder + '/' + image.filename
	metadataPromises.push(sharp(image.sourcePath).metadata())
})
// resolve metadata promises
Promise.all(metadataPromises).then(metadata => {
	images.forEach((image, index) => {
		image.metadata = metadata[index]
	})
	console.log(JSON.stringify(images, null, 2))
	// resize images
	images.forEach(image => {
		sharp(image.sourcePath)
			.resize(image.metadata.width / 2, image.metadata.height / 2)
			.toFile(image.thumbPath)
	})
})
