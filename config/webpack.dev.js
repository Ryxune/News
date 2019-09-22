const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
    mode: "development",

    devtool: "source-map",
    devServer: {
        port: 8001,
        stats: 'errors-only', // + 只打印报错信息
        host:'0.0.0.0' //支持手机ip访问
    },
})