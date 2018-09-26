const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');

module.exports = {
    context: path.join(__dirname, '../client'),

    entry: {
        main: './index.tsx'
    },

    output: {
        path: path.join(__dirname, '../dist/client/'),
        publicPath: '/public/',
        filename: 'public/[name].[chunkhash:8].js',
        chunkFilename: 'public/[name].[chunkhash:8].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'happypack/loader?id=css'
            },
            {
                test: /\.less$/,
                use: 'happypack/loader?id=less'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?[a-z0-9=&.]+)?$/,
                loader: 'url-loader?limit=10000',
            }, {
                test: /\.(eot|ttf|wav|mp3)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader?name=[name][hash:8].[ext]',
            },
            {
                test: /\.jsx?$/,
                use: 'happypack/loader?id=js',
                // 排除node_modules中的文件
                exclude: /(node_modules|assets)/
            },
            {
                test: /\.tsx?$/,
                use: 'happypack/loader?id=js',
                // 排除node_modules中的文件
                exclude: /(node_modules|assets)/
            }
        ]
    },

    mode: 'development',

    plugins: [
        new HappyPack({
            id: 'js',
            threads: 4,
            loaders: [{
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  happyPackMode: true,
                  configFile: path.join(__dirname, '../client/tsconfig.json')
                }
            }]
        }),
        new HappyPack({
            id: 'less',
            threads: 2,
            loaders: [
                'style-loader',
                'css-loader',
                {
                    loader: 'autoprefixer-loader',
                    options: { browsers: 'last 5 version' }
                },
                'less-loader'
            ]
        }),
        new HappyPack({
            id: 'css',
            threads: 2,
            loaders: ['style-loader', 'css-loader']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.ejs',
            template: path.join(__dirname, '../client/index.ejs'),
            chunks: ['main'],
            minify: {
                collapseWhitespace: true
            }
        })
    ],

    resolve: {
        alias: {
            Common: path.join(__dirname, '../common'),
            Config: path.join(__dirname, '../client/config'),
            Components: path.join(__dirname, '../client/components'),
            Utils: path.join(__dirname, '../client/utils')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },

    devtool: 'source-map'
};
