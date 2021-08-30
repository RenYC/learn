const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config)

// 告知 express 使用 webpack-dev-middleware
// 以及将 webpack.config.js 配置文件作文基础配置
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
)

app.get('/get', (req, res)=>{
  // res.send('Hello World!')
  res.json({
    msg: '请求成功'
  })
})

// app.use(express.static(__dirname))

// 将文件 serve 到 port 3001。
app.listen(3001, function(){
  console.log('http://localhost:3001 \n');
})