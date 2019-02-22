const path = require( 'path' );
const webpack = require( 'webpack' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );
const LodashModuleReplacementPlugin = require( 'lodash-webpack-plugin' );

module.exports = {
	mode: 'production',
	entry: [
		'./src/MivaLayout.js'
	],
	target: 'web',
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'miva-layout.bundle.js',
		library: 'MivaLayout',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},
	optimization: {
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
	},
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
						]
					}
				}
			}
		]
	},
	plugins: [
		new LodashModuleReplacementPlugin
	],
	stats: {
		colors: true
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve( __dirname ),
		publicPath: '/dist/',
		openPage: '/demo',
		watchOptions: {
			ingored: /node_modules/
		},
		compress: true
	}
};