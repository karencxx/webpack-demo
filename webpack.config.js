var path = require('path')
var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')
//定义文件夹lujing
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')

module.exports = {
	/**项目的文件夹 可以直接用文件夹名称
	*	默认会找index.js 也可以确定是哪个文件名
	*/

	entry: APP_PATH,

	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},

	/*devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},*/

	//2版 配置webpack-dev-server代理
	devServer: {
		hot: true,
		inline: true,
		proxy: {
			'/api/*': {
				target: 'http://localhost:5000',
				secure: false
			}
		}
	},

	devtool: 'source-map', //启用source-map  2版

	module: {
		loaders: [{
			test: /(\.scss$)/,
			loader: ["style-loader","css-loader","sass-loader"],
			include: APP_PATH
		},{
			test: /\.(png|jpg)$/,
			loader: 'url?limit=23'
		}],

		// preLoaders: [{
		// 	test: /\.js$/,
		// 	include: APP_PATH,
		// 	loader: 'jshint-loader'
		// }]
		// rules: [
		// 	{test: /\.css$/, use:['style-loader', 'css-loader']} 
		// ]
	},

	// jshint: {
	// 	"esnext": true
	// },

	//添加我们的插件 会自动生成一个html文件
	plugins: [
		new HtmlwebpackPlugin({
			title: 'Hello World webpack'
		}),
		//provide $, jQuery and window. jQuery to every script
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),

	]
}