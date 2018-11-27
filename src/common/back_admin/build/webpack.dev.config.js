const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    // proxyTable: {

    //   '/api/': {
    //     target: 'http://exchang.dev1.xsl.ph', // 开发调试接口地址
    //     changeOrigin: true,
    //     withCredentials: true
    //     // onProxyRes: function(proxyRes, req, res) {
    //     //   proxyRes.headers['Content-Type'] = 'application/json; charset=utf-8'
    //     // }
    //   }
    // },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: '澳绿宝溯源项目管理后台 v' + package.version,
            filename: '../index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main-components/theme-switch/theme'
            },
            {
                from: 'src/views/my-components/text-editor/tinymce'
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        })
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: 9090,    
        proxy: {
          //// =========================== https设置 =====================================
          // 代理所有的以 /api 开头的请求到 https://xxxx.com
          '/jewel-openapi/': {
            // target: 'http://10.88.88.20:8080',
            target: 'http://47.75.178.24:8080',
            // target: 'http://10.88.88.189:8989',
            //target: 'https://xcx.lingane-sport.com',
            changeOrigin: true,
            secure: false
          }
        }
    
      },
});