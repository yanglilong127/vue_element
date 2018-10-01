const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		main: ['babel-polyfill', path.join(__dirname,'web/src/main.js')]
	},
	output: {
		path: path.join(__dirname, 'web/dist'),
		filename: 'js/[name].js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude:/node_modules/,
				loader: 'babel-loader'
			},{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {}
			},{
				test: /\.css$/,
				use:[
					'vue-style-loader',
					'css-loader',
					'less-loader'
				]
			},{
				test: /\.(jpeg|jpg|gif|png|svg)$/,
				loader:'file-loader?name=images/[name].[ext]'
			},{
				test:/\.(eot|svg|ttf|woff|woff2)$/,
				loader:'file-loader',
				options:{
					//limit:5000,
					name:'fonts/[name].[ext]'
				}
			},{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	resolve: {
		alias: {

		},
		extensions: ['*','.js','.vue','.json']
	},
	plugins: [
		new VueLoaderPlugin(),
		//复制文件
		new CopyWebpackPlugin([
			{
				from: 'web/src/favicon.ico',  //图标
				to: './',
				flatten: true
			},{
				from: 'web/src/index.html',  //图标
				to: './',
				flatten: true
			},{
				from: './web/src/assets/images/*',
				to: './images/',
				flatten: true
			},{
				from: './web/src/libs/js/*',
				to: './libs/js/',
				flatten: true
			}
		]),
		/**压缩*
		new webpack.optimize.UglifyJsPlugin({
			sourceMap:true,
			compress:{
				warnings:false
			}
		}),**/
	],
	devServer: {
		contentBase: __dirname+ '/web/dist'
	},
	watch: true
}