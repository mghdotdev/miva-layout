const path = require( 'path' );
const webpack = require( 'webpack' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );

module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'miva-layout.bundle.js',
		library: 'MivaLayout',
		libraryTarget: 'umd',
	},
	/*optimization: {
		minimizer: [
			new UglifyJSPlugin({
				extractComments: false,
				sourceMap: true,
				uglifyOptions: {
					mangle: {
						keep_fnames: true
					}
				}
			})
		]
	},*/
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [/src/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										ie: '11'
									}
								}
							]
						],
						plugins: [
							[
								'@babel/plugin-proposal-optional-chaining',
								{
									loose: true
								}
							]
						]
					}
				}
			}
		]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map',
	devServer: {
		contentBase: './',
		openPage: './demo/index.html',
		compress: true
	}
};