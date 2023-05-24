const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
module.exports = {
    target: 'web',
    mode: process.env.NODE_ENV,
    entry: {
        index: './index.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            },
            {
                test: /\.(c|le|sa|sc|pc)ss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'}
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff)$/i,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets',
                            publicPath: isDev ? 'http://localhost:63342/all-about-js-dev/2.webpack/dist/assets' : 'https://cdn.kong.com/assets',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CssMinimizerPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
        })
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': __dirname
        }
    }
}
