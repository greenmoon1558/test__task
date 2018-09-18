const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    watchOptions: {
        aggregateTimeout: 100,
        poll: 100
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        historyApiFallback: true
    },

    devtool: "cheap-eval-source-map",
    performance: {
        maxEntrypointSize: 10000,
        maxAssetSize: 10000,
        hints: false
    },

    entry: {
        index: ['./src/js/index.js',
    './src/styles/main.scss']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id][hash].js',
        publicPath: '/'
    },
    module: {
        rules: [

            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']

            },
            {
                test: /\.(css|sass|scss)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            minimize: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.(html)$/,
                include: path.join(__dirname, 'src/template'),
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                        minimize: true
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|jpeg|ttf|svg|otf)$/,
                use: [{
                    loader: 'file-loader'

                }]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
            title: "app",
            template: __dirname + '/src/index.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[hash].css",
            chunkFilename: "[id][hash].css"
        }),
        new UglifyJsPlugin({
            sourceMap: true
        }),

    ],
    mode: 'production'
}