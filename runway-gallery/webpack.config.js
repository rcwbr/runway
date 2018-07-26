var path = require('path')

module.exports = {
	entry: './src/buildRunway.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	resolve: {
		modules: [path.resolve(__dirname, 'node_modules')]
	},
	target: 'node', // defaults to web; required for Webpack to resolve fs module
	externals: {
		sharp: 'commonjs sharp' // external sharp so Webpack doesn't recompile it
	}
}
