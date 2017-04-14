import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
	entry: ["./client/index.js"],
	output: {
		filename: "public/build/bundle.js",
		sourceMapFilename: "public/build/bundle.map"
	},
	devtool: '#source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.css$/,
			loader: 'css-loader'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/index.html',
			inject: 'body'
		})
	]
}