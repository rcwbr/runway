var path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react']
					}
				}
			},
			{
				test: /\.runwayconf.js?/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'runway-webpack-loader'
				}
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([{from: 'src/index.html', to: ''}])
	]
}
