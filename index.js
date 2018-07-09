const fs = require('fs')
const sharp = require('sharp')

// apply default config to gallery config
const galleryConfig = require('./galleryConfig.js')(
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
	// copy image meta into images object
	images.forEach((image, index) => {
		// image.metadata = metadata[index]
		image.metadata = {}
		image.metadata.width = metadata[index].width
		image.metadata.height = metadata[index].height
	})

	// distribute images into rows in gallery object
	var gallery = {
		rows: []
	}
	var row = {
		height: -1,
		width: 0,
		images: []
	}
	images.forEach((image, index) => {
		if (row.height === -1 || image.metadata.height < row.height) {
			// scale the running row width total by the new image scale
			row.width *= (image.metadata.height / row.height)
			row.height = image.metadata.height
		}
		row.images.push(image)
		row.width += image.metadata.width * (row.height / image.metadata.height)

		// if row has enough images and enough horizontal pixels, push to gallery
		var marginWidth = (row.images.length - 1) * galleryConfig.imageMargins.horiz
		if (
			row.width + marginWidth >= galleryConfig.width
			&& images.length >= galleryConfig.imagesPerRow
		) {
			gallery.rows.push(row)
			row = {
				height: -1,
				width: 0,
				images: []
			}
		}
	})
	// add the last row if it had fewer images than the imagesPerRow setting
	if (row.images.length > 0) {
		gallery.rows.push(row)
	}

	gallery.rows.forEach((row) => {
		// images will be scaled to gallery width less the horizontal image margins
		const galleryImageWidth = (
			galleryConfig.width
			- galleryConfig.imageMargins.horiz * (row.images.length - 1)
		)
		row.images.forEach((image) => {
			// scale image height to row height
			image.scaleFactor = row.height / image.metadata.height
			// scale images to fit in row
			image.scaleFactor *= galleryImageWidth / row.width
			// round down to prevent row overflow
			image.width = Math.floor(image.metadata.width * image.scaleFactor)
			image.height = Math.floor(image.metadata.height * image.scaleFactor)

			// resize image
			sharp(image.sourcePath)
				.resize(image.width, image.height)
				.toFile(image.thumbPath)
		})
	})
})
