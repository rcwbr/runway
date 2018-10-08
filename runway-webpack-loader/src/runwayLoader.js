// import buildRunway from 'runway-gallery' TODO: update runway-gallery README to use import
// import path from 'path'
var buildRunway = require('runway-gallery')
var path = require('path')

// export default (content) => {
module.exports = function(content) {
	var galleryConfig = JSON.parse(content)
	const rootContext = this.rootContext ?
		this.rootContext
		: this.options.context
	const context = path.relative(rootContext, this.context)
	var webpackCallback = this.async()
	buildRunway.default(galleryConfig, context).then(gallery => {
		var runwayModule = ''
		gallery.gallery.rows.forEach(row => {
			row.images.forEach(image => {
				runwayModule += 'require(\'file-loader?name=' + gallery.imagesFolder
				runwayModule += '/[name].[ext]!./' + gallery.imagesFolder
				runwayModule += '/' + image.filename + '\')\n'

				runwayModule += 'require(\'file-loader?name=' + gallery.thumbsFolder
				runwayModule += '/[name].[ext]!./' + gallery.thumbsFolder
				runwayModule += '/' + image.filename + '\')\n'
			})
		})
		runwayModule += 'module.exports = ' + JSON.stringify(gallery)
		webpackCallback(null, runwayModule)
	})
}
