 
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./ui/src/index.js'],
        vendor: ['react', 'react-dom']
    },

    output: {
        path: path.resolve(__dirname, './ui/public/js'),
        filename: '[name].js',
        publicPath: '/ui/public/'
    },

    module: {
        loaders: [{
            test: [/\.js$/],
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'ui/src/')
            ]
        },
        {
            test: /\.(jpg|png)$/,
            loader: 'url-loader',
            options: {
                limit: 25000
            }
        }]
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'source-map'
};