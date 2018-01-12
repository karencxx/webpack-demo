var path = require('path')
var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')
//定义文件夹lujing
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')

/*4版*/
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

/*__dirname 是node.js中的一个全局变量，它指向当前执行脚本所在的目录*/

module.exports = merge(common, {
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
		historyApiFallback: true, //依赖于HTML5 history API, true将所有跳转指向index.html,适用于开发单页面 false url会带#
		hot: true,
		inline: true,
		progress: true
	},*/

	//2版 配置webpack-dev-server本地服务器代理 代码热替换
	devServer: {
		hot: true,
		inline: true, //true当源文件改变时会自动刷新页面
		proxy: {
			'/api/*': {
				target: 'http://localhost:8080',
				secure: false
			}
		}
	},

	devtool: 'source-map', //启用source-map  2版 便于调试

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
		//provide $, jQuery and window. jQuery to every script
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),

	]
})