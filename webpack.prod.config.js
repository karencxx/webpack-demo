/*
 *	部署上线 config.js
 *  删除和开发有关的东西
 */

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

	// entry: APP_PATH,
	//2版 分离app.js 和 第三方库
	entry: {
		app: path.resolve(APP_PATH, 'index.js'),
		//添加要打包在vendors里面的库
		vendors: ['jquery', 'moment']
	},

	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: '[name].js'
	},

	module: {
		rules: [{
			test: /(\.scss$)/,
			loader: ["style-loader","css-loader","sass-loader"],
			include: APP_PATH
		},{
			test: /\.(png|jpg)$/,
			loader: 'url?limit=23'
		}
		,{
			test: /\.js$/,
			use:[{
				loader: "babel-loader",
				options: {
					presets: ["es2015"]
				}
			}],
			exclude: /node_modules/
		}
		],
	},

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
		//使用uglifyJs压缩js代码
		new webpack.optimize.UglifyJsPlugin({minimize: true}),
		//将入口文件里面的数组打包成vendor.js
		
		// new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
		/* 上面这种写法会报错
		 * throw new Error(`Deprecation notice: CommonsChunkPlugin now only takes a 
		 *	single argument. Either an options
		 */

		new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename:"vendor.bundle.js"})
	]
}