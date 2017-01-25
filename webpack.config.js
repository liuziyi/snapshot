var webpack = require('webpack')
var path = require('path')

module.exports = {

	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'public/build/bundle.js',
		sourceMapFilename: 'public/build/bundle.map.js'
	},
	devtool: '#source-map',
	plugins: process.env.NODE_ENV === 'production' ? [
	    new webpack.DefinePlugin({
	        'process.env': {
	        	'NODE_ENV': JSON.stringify('production')
	        }
	    }),
    	new webpack.optimize.UglifyJsPlugin({
    		minimize: true,
		    compress: {
		        warnings: true
		    }
    	})
	] : [],	
	module: {
		loaders: [
			{
				loader: 'babel',
				test: /\.js?$/,
				exclude: /(node_modules)/,
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}

}