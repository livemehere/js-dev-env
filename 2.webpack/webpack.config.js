const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
module.exports = {
    target: 'web',
    mode: process.env.NODE_ENV,
    entry: {
        index: './index.ts',
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean:true
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer:{
        static: path.resolve(__dirname, 'dist'),
        hot:true,
    },
    optimization: {
        moduleIds: 'deterministic', // 없어도 동작함.
        runtimeChunk: 'single', // 여러 엔트리 일 경우 모듈을 중복 로드 하는 것을 방지
        splitChunks:{
            cacheGroups:{
                vendor:{ // 캐싱할 단위로 파일을 분리
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
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
                            publicPath: isDev ? '' : 'https://cdn.kong.com/assets',
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
