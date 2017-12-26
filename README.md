#webpack demo

###提交一
	初步搭建webpack, 配置webpack.config.js 
#关键词
	html-webpack-plugin
	单入口 
	devServer devtool
	css-loader  style-loader sass-loader
	jquery


#操作
```bash
	mkdir webpack-eg
	cd webpack-eg
	npm init

	npm start
```

###提交二
#关键词
	webpack-dev-server 代理
	source-map
	部署上线 webpack-prod.config.js
	分离app.js 和 第三方库
	vendor: [] / filename: '[name].js'
	uglifyJs CommonsChunkPlugin
	babel-loader
	npm run build

###提交三
#关键词
	生成多页面
	多入口
	templates	index.html / mobile.html
	生成hash名称的script 来防止缓存
	output filename: [name].[hash].js 