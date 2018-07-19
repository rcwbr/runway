// import buildRunway from 'runway-gallery'
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
		webpackCallback(null, 'module.exports = ' + JSON.stringify(gallery))
	})
}
