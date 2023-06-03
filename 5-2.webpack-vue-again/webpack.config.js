const {VueLoaderPlugin} = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(c|le)ss$/,
                use:['style-loader','css-loader','less-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
    devServer: {
        port:3000
    },
    resolve:{
        extensions: ['.js','.vue']
    }
}