// import buildRunway from 'runway-gallery'
var buildRunway = require('runway-gallery')

// export default (content) => {
module.exports = function(content) {
	var webpackCallback = this.async()
	const galleryPath = this.context
	var obj = JSON.parse(content)

	buildRunway.default(obj).then(gallery => {
		webpackCallback(null, 'module.exports = ' + JSON.stringify(gallery))
	})
	return
}
