var path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/components/Index/index.jsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react']
					}
				}
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([{from: 'src/index.html', to: ''}])
	]
}
