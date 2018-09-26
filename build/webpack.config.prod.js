const path = require('path');
const webpackConfig = require('./webpack.config.base.js');

webpackConfig.output.path = path.join(__dirname, '../dist/client');
webpackConfig.mode = 'production';

console.log(webpackConfig);

module.exports = webpackConfig;
