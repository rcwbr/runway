var path = require('path')

module.exports = {
	entry: './src/components/Gallery/index.jsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|build)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react', 'env'],
						plugins: [
							'syntax-dynamic-import',
							'transform-object-rest-spread',
							'transform-react-jsx'
						]
					}
				}
			}
		]
	},
	externals: {
		react: 'commonjs react'
	}
}
